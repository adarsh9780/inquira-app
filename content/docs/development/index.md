---
title: Development Guide
description: Set up your local development environment for Inquira.
---

# Development Guide

This guide helps contributors set up a local development environment for the Inquira desktop app.

## Prerequisites

- Python 3.12+
- Node.js 24 LTS
- Rust for Tauri
- Git

## Clone The Repository

```bash
git clone https://github.com/adarsh9780/inquira-ce.git
cd inquira-ce
```

## Install Dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
pip install -r requirements.txt
```

## Development Commands

### Run Frontend Only

```bash
cd frontend
npm run dev
```

### Run Desktop App From Source

```bash
make dev
```

For a local desktop package:

```bash
make build
```

## Project Structure

```text
inquira-ce/
├── backend/           # FastAPI backend, agents, runtime, persistence
├── frontend/          # Vue workspace UI
├── src-tauri/         # Tauri desktop shell
├── shared/            # Shared support code
└── docs/              # Engineering notes and audits
```

## Areas Worth Understanding

- Workspace and dataset APIs
- Jupyter runtime management
- Python execution and artifact capture
- Code editor state and agent/user source switching
- Conversation tree and turn artifacts
- Terminal consent and command execution

## Making Changes

1. Create a branch for your feature.
2. Make focused changes.
3. Add or update tests for the behavior.
4. Run the relevant test suite.
5. Commit with a descriptive message.

Python and terminal execution features run with the desktop user's permissions and are not sandboxed, so changes in this area need careful review.
