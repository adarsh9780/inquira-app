---
title: Development Guide
description: Set up your local development environment for Inquira.
---

# Development Guide

This guide helps contributors set up a local development environment for Inquira.

## Prerequisites

- Python 3.12+
- Node.js 24 LTS
- Rust (for Tauri)
- Git

## Clone the Repository

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

### Run Desktop App (From Source)

```bash
cd src-tauri
cargo tauri dev
```

## Project Structure

```
inquira-ce/
├── backend/           # Python FastAPI backend
│   └── app/
│       ├── agents/    # LangGraph agent definitions
│       └── api/       # REST API endpoints
├── frontend/          # Vue.js frontend
│   └── src/
│       ├── components/
│       └── pages/
├── src-tauri/         # Tauri desktop shell
└── docs-site/         # Documentation (Docusaurus)
```

## Making Changes

1. Create a branch for your feature: `git checkout -b feature/my-feature`
2. Make your changes
3. Run tests: `make test`
4. Commit using: `make git-commit`

:::tip
Before running `make git-commit`, create a `commit_message.txt` file with your commit message.
:::
