#!/usr/bin/env python3
"""Deploy firstdata-website to Dokploy from this machine (no drop zip of full source)."""

from __future__ import annotations

import json
import os
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

GITHUB_OWNER = "MrAlfak"
GITHUB_REPO = "firstdata-website"
GITHUB_BRANCH = "main"
GITHUB_TOKEN = os.environ.get(
    "GITHUB_TOKEN",
    "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",
)


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


def github_archive_url() -> str:
    base = f"https://github.com/{GITHUB_OWNER}/{GITHUB_REPO}/archive/refs/heads/{GITHUB_BRANCH}.zip"
    if GITHUB_TOKEN:
        return base.replace(
            "https://",
            f"https://x-access-token:{GITHUB_TOKEN}@",
            1,
        )
    return base


def upload_drop_stub() -> None:
    stub = ROOT / ".deploy-stub.zip"
    with zipfile.ZipFile(stub, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.write(ROOT / "Dockerfile.dokploy", arcname="Dockerfile.dokploy")
        zf.writestr(".dokploy-local", "Local deploy stub — source from GitHub archive URL.")
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
        if status != last_status:
            print(f"deployment: {title!r} -> {status}")
            last_status = status
        if status in {"done", "error"}:
            return status
        time.sleep(20)
    raise TimeoutError("deployment did not finish in time")


def main() -> int:
    source_url = github_archive_url()
    print(f"Source: GitHub archive ({GITHUB_OWNER}/{GITHUB_REPO}@{GITHUB_BRANCH})")

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
            "title": f"Local deploy v1.4.11 from {GITHUB_OWNER}/{GITHUB_REPO}",
            "description": f"GitHub archive: {GITHUB_BRANCH}",
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
