---
title: Desktop Distribution
description: How Inquira is currently distributed, what we do and do not guarantee, and how to build it yourself.
---

# Desktop Distribution

This page explains exactly how the current desktop builds are distributed.

## Short Version

- The macOS and Windows installers are built by a single independent developer.
- Windows is currently distributed as a direct installer download from our public download bucket.
- On macOS, the app is **not yet signed or notarized through Apple's paid developer program**.
- On macOS, the recommended install path is a small shell script hosted at `https://inquiraai.com/install.sh`.
- If you do not want to trust the distributed binary, you are free to build the app yourself from source on GitHub.

## Why We Are Doing It This Way

Inquira is currently developed and released by a single developer with limited funds. Apple's paid developer program is required for the normal signed and notarized macOS distribution flow, and the project does not yet have the budget to support that cost responsibly.

Rather than pretending otherwise, we want to be explicit:

- the current macOS distribution model is a practical workaround
- it is not the same as a signed and notarized App Store-style install
- the source code is public so you can inspect it and build it yourself if that better matches your trust model

## Why Apple Gatekeeping Makes This Harder

Apple presents Gatekeeper and notarization as a trust and safety layer, but for independent developers it also functions as a paid distribution gate. In practice, that means a solo developer shipping a free or early-stage app is asked to pay Apple first before macOS will treat the app like a normal citizen.

That does not mean Gatekeeper is useless. It does mean the current system puts meaningful distribution power in Apple’s hands, even when the developer is being explicit, publishing the source, and not trying to hide what the installer does.

So the current Inquira install flow is intentionally honest:

- we tell you the app is not yet signed or notarized
- we tell you exactly what the installer script does
- we leave the source public so you can inspect or build it yourself
- we do not pretend Apple’s paid trust signals are the same thing as transparency

## What the Current macOS Experience Means

If you download or install the current macOS app, Gatekeeper may warn that the app is from an unidentified developer or may mark it as damaged. That does **not** automatically mean the app contains malware. It means the app does not yet carry Apple's paid trust signals for public Mac distribution.

For users who are comfortable with that tradeoff, we provide a small installer script that uses Homebrew under the hood. The script explains what it will do, installs Homebrew if needed, installs the `inquira` cask, and explicitly asks before removing the quarantine flag from the installed app.

The current macOS install command is:

```bash
curl -fsSL https://inquiraai.com/install.sh | bash
```

## Build It Yourself

If you prefer to avoid the distributed binary entirely, build from source instead:

- Source repository: [Inquira CE on GitHub](https://github.com/adarsh9780/inquira-ce)
- Project docs: [Development](/docs/development)

That path gives you the strongest possible transparency because you can inspect the code and produce the app on your own machine.

## What We Plan To Do Next

Once the project has enough paying customers or other sustainable support to cover the cost responsibly, we plan to apply for the Apple Developer Program and move to proper signed and notarized macOS distribution.

Until then, this page is here so there is no ambiguity about how the desktop app is currently shipped.
