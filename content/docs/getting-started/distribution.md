---
title: Desktop Distribution
description: How Inquira desktop releases are built, verified, and delivered.
---

# Desktop Distribution

Inquira currently publishes Apple Silicon macOS and x64 Windows installers.

## Automated Release Path

Every stable Inquira Go release follows one controlled path:

1. The release tag must point to a commit on the protected development line.
2. That exact commit must already have a successful continuous-integration run.
3. GitHub builds macOS on a native Apple Silicon runner and Windows on a native Windows runner.
4. The workflow verifies the embedded application version and bundled runtime metadata.
5. SHA-256 checksums are generated for both installers.
6. Installers are attached to the private maintainer GitHub Release.
7. The same files are uploaded to the public Cloudflare R2 download bucket.
8. `latest.json` is uploaded last, after every versioned object succeeds.

Publishing the latest pointer last means an interrupted release cannot direct
users to an installer that has not finished uploading.

## Why Downloads Use Cloudflare R2

The source repository is private, so its GitHub Release assets require GitHub
repository access. They cannot serve normal public downloads. Cloudflare R2 is
the public distribution layer used by the website and guided installer.

Versioned installers and their checksums are available under
`https://downloads.inquiraai.com/v<version>/`. The homepage reads
`https://downloads.inquiraai.com/latest.json` to find the current files.

## macOS

The macOS application is not signed or notarized through Apple's paid developer
program. The guided installer therefore:

- downloads the current Apple Silicon DMG over HTTPS;
- verifies the SHA-256 value from the release manifest;
- copies Inquira into `/Applications`;
- asks before removing the macOS quarantine attribute.

Run the guided installer with:

```bash
curl -fsSL https://inquiraai.com/install.sh | bash
```

The script does not install Homebrew and does not silently alter Gatekeeper
settings. Rerun the same command to upgrade.

## Windows

The Windows x64 NSIS installer is downloaded directly from the public release
bucket. It is not currently Authenticode-signed, so Microsoft Defender
SmartScreen may show an unknown-publisher warning.

Trusted signing for a directly distributed executable is not available for
free. Microsoft Store MSIX distribution could provide free Store signing in a
future release, but it is a separate packaging and publishing path.

## Verification

Each release directory contains:

- the macOS DMG;
- the Windows installer;
- `manifest.json`;
- `SHA256SUMS.txt`.

You can compare a downloaded file against `SHA256SUMS.txt` before opening it.
The macOS guided installer performs this verification automatically.
