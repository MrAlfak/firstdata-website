#!/usr/bin/env python3
"""Upload firstdata-website source to Dokploy via drop deployment."""

from __future__ import annotations

import io
import json
import os
import subprocess
import sys
import time
import urllib.request
import zipfile
from pathlib import Path

API_BASE = "https://blob.firstdata.ir/api"
APPLICATION_ID = "OdaijD3VSsluMRvU4NQQ_"
ROOT = Path(__file__).resolve().parents[1]


def require_env(name: str, *, min_len: int = 1) -> str:
    value = os.environ.get(name, "").strip()
    if len(value) < min_len:
        suffix = f" (at least {min_len} characters)" if min_len > 1 else ""
        print(f"{name} is required{suffix}", file=sys.stderr)
        sys.exit(1)
    return value


API_KEY = require_env("DOKPLOY_API_KEY")

EXCLUDE_DIRS = {
    "node_modules",
    ".next",
    "out",
    "build",
    ".git",
    "data",
    ".vercel",
}
EXCLUDE_FILES = {".env", ".env.local"}


def api(method: str, path: str, data: dict | None = None) -> dict:
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


def upload_drop(zip_bytes: bytes) -> None:
    zip_path = ROOT / ".deploy-source.zip"
    zip_path.write_bytes(zip_bytes)
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
                f"zip=@{zip_path}",
            ],
            capture_output=True,
            text=True,
            timeout=600,
        )
        print("drop-deployment status:", result.returncode)
        print(result.stdout or result.stderr)
        if result.returncode != 0:
            raise RuntimeError(f"drop-deployment failed: {result.stderr or result.stdout}")
    finally:
        zip_path.unlink(missing_ok=True)


def wait_for_deploy(timeout_sec: int = 900) -> str:
    started = time.time()
    last_status = ""
    while time.time() - started < timeout_sec:
        payload = api("GET", f"deployment.all?applicationId={APPLICATION_ID}")
        items = payload.get("data") if isinstance(payload, dict) else payload
        if not items:
            time.sleep(10)
            continue
        latest = items[0]
        status = latest.get("status", "")
        title = latest.get("title", "")
        if status != last_status:
            print(f"deployment: {title!r} -> {status}")
            last_status = status
        if status in {"done", "error"}:
            return status
        time.sleep(15)
    raise TimeoutError("deployment did not finish in time")


def main() -> int:
    print("Creating source zip...")
    zip_bytes = make_zipball()
    print(f"Zip size: {len(zip_bytes) / 1024 / 1024:.1f} MB")

    print("Uploading via drop-deployment...")
    upload_drop(zip_bytes)

    print("Waiting for build...")
    status = wait_for_deploy()
    if status != "done":
        print("Deployment failed.")
        return 1

    print("Deployment completed successfully.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
