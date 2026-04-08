---
title: Desktop Distribution
description: How Inquira is currently distributed, what we do and do not guarantee, and how to build it yourself.
---

# Desktop Distribution

This page explains exactly how the current desktop builds are distributed.

## Short Version

- The macOS and Windows installers are built by a single independent developer.
- The installers are currently distributed directly from our public download bucket.
- On macOS, the app is **not yet signed or notarized through Apple's paid developer program**.
- For technical users on macOS, we also provide a Homebrew tap as a convenience install path.
- If you do not want to trust the distributed binary, you are free to build the app yourself from source on GitHub.

## Why We Are Doing It This Way

Inquira is currently developed and released by a single developer with limited funds. Apple's paid developer program is required for the normal signed and notarized macOS distribution flow, and the project does not yet have the budget to support that cost responsibly.

Rather than pretending otherwise, we want to be explicit:

- the current macOS distribution model is a practical workaround
- it is not the same as a signed and notarized App Store-style install
- the source code is public so you can inspect it and build it yourself if that better matches your trust model

## What the Current macOS Experience Means

If you download the macOS app directly, Gatekeeper may warn that the app is from an unidentified developer or may mark it as damaged. That does **not** automatically mean the app contains malware. It means the app does not yet carry Apple's paid trust signals for public Mac distribution.

For users who are comfortable with that tradeoff, we provide a Homebrew tap to make installation easier. The tap currently applies the quarantine-removal step automatically after install so technical users do not have to run it by hand.

## Build It Yourself

If you prefer to avoid the distributed binary entirely, build from source instead:

- Source repository: [Inquira CE on GitHub](https://github.com/adarsh9780/inquira-ce)
- Project docs: [Development](/docs/development)

That path gives you the strongest possible transparency because you can inspect the code and produce the app on your own machine.

## What We Plan To Do Next

Once the project has enough paying customers or other sustainable support to cover the cost responsibly, we plan to apply for the Apple Developer Program and move to proper signed and notarized macOS distribution.

Until then, this page is here so there is no ambiguity about how the desktop app is currently shipped.
