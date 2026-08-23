#!/usr/bin/env python3
"""Deploy firstdata-website to Dokploy from this machine (local source zip, not GitHub)."""

from __future__ import annotations

import io
import json
import os
import re
import subprocess
import sys
import time
import urllib.request
import zipfile
from pathlib import Path

API_BASE = "https://blob.firstdata.ir/api"
API_KEY = os.environ.get(
    "DOKPLOY_API_KEY",
    "TGhDmuUDkJacphxVZjXubVhNvnvvbVqcEGTonfzqWYYdcSQcalfvOBkFRmxLqIHR",
)
APPLICATION_ID = "OdaijD3VSsluMRvU4NQQ_"
ROOT = Path(__file__).resolve().parents[1]

EXCLUDE_DIRS = {
    "node_modules",
    ".next",
    "out",
    "build",
    ".git",
    "data",
    ".vercel",
    ".cursor",
    "agent-transcripts",
}
EXCLUDE_FILES = {".env", ".env.local", ".deploy-source.zip", ".deploy-stub.zip", ".dl-test.zip"}


def api(method: str, path: str, data: dict | None = None) -> dict | list:
    url = f"{API_BASE}/{path}"
    body = json.dumps(data).encode() if data is not None else None
    req = urllib.request.Request(
        url,
        data=body,
        method=method,
        headers={
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        raw = resp.read().decode()
        return json.loads(raw) if raw else {}


def app_version() -> str:
    pkg = ROOT / "package.json"
    match = re.search(r'"version"\s*:\s*"([^"]+)"', pkg.read_text(encoding="utf-8"))
    return match.group(1) if match else "unknown"


def make_zipball() -> bytes:
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in ROOT.rglob("*"):
            rel = path.relative_to(ROOT)
            if any(part in EXCLUDE_DIRS for part in rel.parts):
                continue
            if rel.name in EXCLUDE_FILES or rel.name.startswith(".env."):
                continue
            if path.is_dir():
                continue
            zf.write(path, arcname=str(rel).replace("\\", "/"))
    return buf.getvalue()


def upload_zipball(data: bytes) -> str:
    zip_path = ROOT / ".deploy-source.zip"
    zip_path.write_bytes(data)
    try:
        result = subprocess.check_output(
            [
                "curl.exe",
                "-s",
                "-F",
                f"file=@{zip_path}",
                "https://tmpfiles.org/api/v1/upload",
            ],
            text=True,
        )
        payload = json.loads(result)
        if payload.get("status") != "success":
            raise RuntimeError(f"tmpfiles upload failed: {payload}")
        page_url = payload["data"]["url"]
        parts = page_url.replace("https://tmpfiles.org/", "").split("/", 1)
        return f"https://tmpfiles.org/dl/{parts[0]}/{parts[1]}"
    finally:
        zip_path.unlink(missing_ok=True)


def upload_drop_stub() -> None:
    stub = ROOT / ".deploy-stub.zip"
    with zipfile.ZipFile(stub, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.write(ROOT / "Dockerfile.dokploy", arcname="Dockerfile.dokploy")
        zf.writestr(".dokploy-local", "Local deploy — source zip uploaded from this machine.")
    try:
        result = subprocess.run(
            [
                "curl.exe",
                "-sS",
                "-X",
                "POST",
                f"{API_BASE}/trpc/application.dropDeployment",
                "-H",
                f"x-api-key: {API_KEY}",
                "-F",
                f"applicationId={APPLICATION_ID}",
                "-F",
                f"zip=@{stub}",
            ],
            capture_output=True,
            text=True,
            timeout=120,
        )
        print(result.stdout or result.stderr)
        if result.returncode != 0:
            raise RuntimeError("drop stub upload failed")
    finally:
        stub.unlink(missing_ok=True)


def configure(source_url: str) -> None:
    env = (
        "NODE_ENV=production\n"
        "PORT=3000\n"
        "AUTH_SECRET=PfYRXKgCsgcG8vbz9eCJQorX0i0_BeBScu_M_XNP-EfTC44d_yNQoWU8ZA6Nprco\n"
        "NEXT_PUBLIC_SITE_URL=https://firstdata.ir\n"
        "MAINTENANCE_MODE=false\n"
        "NEXT_PUBLIC_ENABLE_SW=true"
    )
    api(
        "POST",
        "application.update",
        {
            "applicationId": APPLICATION_ID,
            "sourceType": "drop",
            "dockerfile": "Dockerfile.dokploy",
            "dockerContextPath": ".",
            "buildType": "dockerfile",
            "cleanCache": True,
        },
    )
    api(
        "POST",
        "application.saveBuildType",
        {
            "applicationId": APPLICATION_ID,
            "buildType": "dockerfile",
            "dockerfile": "Dockerfile.dokploy",
            "dockerContextPath": ".",
            "dockerBuildStage": None,
            "herokuVersion": None,
            "railpackVersion": None,
        },
    )
    api(
        "POST",
        "application.saveEnvironment",
        {
            "applicationId": APPLICATION_ID,
            "env": env,
            "buildArgs": f"SOURCE_ZIP_URL={source_url}",
            "buildSecrets": None,
            "createEnvFile": True,
        },
    )


def wait_for_deploy(timeout_sec: int = 1200) -> str:
    started = time.time()
    last_status = ""
    while time.time() - started < timeout_sec:
        items = api("GET", f"deployment.all?applicationId={APPLICATION_ID}")
        if not items:
            time.sleep(15)
            continue
        latest = items[0]
        status = latest.get("status", "")
        title = latest.get("title", "")
        deployment_id = latest.get("deploymentId", "")
        if status != last_status:
            print(f"deployment {deployment_id}: {title!r} -> {status}")
            last_status = status
        if status in {"done", "error"}:
            if status == "error":
                logs = api(
                    "GET",
                    f"deployment.readLogs?deploymentId={deployment_id}&tail=120",
                )
                print(logs)
            return status
        time.sleep(20)
    raise TimeoutError("deployment did not finish in time")


def main() -> int:
    version = app_version()
    print(f"Source: local workspace ({ROOT})")
    print(f"Version: v{version}")

    print("Creating source zip...")
    zip_bytes = make_zipball()
    print(f"Zip size: {len(zip_bytes) / 1024 / 1024:.1f} MB")

    print("Uploading source zip...")
    source_url = upload_zipball(zip_bytes)
    print(f"Source URL: {source_url}")

    print("Configuring Dokploy...")
    configure(source_url)

    print("Uploading Dockerfile.dokploy stub...")
    upload_drop_stub()

    print("Triggering deploy...")
    api(
        "POST",
        "application.deploy",
        {
            "applicationId": APPLICATION_ID,
            "title": f"Local deploy v{version} from workspace",
            "description": source_url,
        },
    )

    status = wait_for_deploy()
    if status == "done":
        print("Deployment completed successfully.")
        return 0
    print("Deployment failed — check Dokploy logs.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
