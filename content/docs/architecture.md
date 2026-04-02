---
title: System Architecture
description: Understanding how Inquira works under the hood.
---

# System Architecture

Inquira is built as a desktop application using a modern tech stack that prioritizes privacy, performance, and user control.

## Tech Stack

- **Frontend**: Vue.js with Nuxt
- **Backend**: Python (FastAPI)
- **Desktop**: Tauri (Rust)
- **Database**: DuckDB (local, embedded)
- **AI**: LangGraph for agent workflows, with support for OpenAI, Anthropic, OpenRouter, and Ollama

## Core Components

### Desktop Shell
The Tauri-based desktop application provides:
- Native window management
- Local file system access
- Secure sandboxed execution environment

### Python Backend
A FastAPI server handles:
- LangGraph agent orchestration
- Jupyter kernel management for Python execution
- DuckDB query processing

### AI Agent Workflow
The AI agent uses LangGraph to:
1. Parse natural language queries
2. Generate Python analysis code
3. Execute code in a sandboxed Jupyter environment
4. Return results, charts, and natural language explanations

## Privacy Model

All data processing happens locally on your machine:

```
┌─────────────────────────────────────────────────────────┐
│                    Your Computer                          │
│  ┌─────────────┐    ┌─────────────┐    ┌────────────┐ │
│  │  Your Data  │───▶│   DuckDB    │───▶│  Results   │ │
│  │   (CSV,     │    │   (Local)   │    │  & Charts  │ │
│  │   Excel)    │    │             │    │            │ │
│  └─────────────┘    └─────────────┘    └────────────┘ │
│                          ▲                             │
│                          │                             │
│  ┌─────────────┐         │         ┌───────────────┐  │
│  │  AI Agent   │─────────┴────────▶│    Local      │  │
│  │  (LangGraph)│                     │   Python     │  │
│  └─────────────┘                     │   Execution   │  │
│                                      └───────────────┘  │
└─────────────────────────────────────────────────────────┘
```

No data is ever sent to external servers unless you explicitly configure cloud AI providers.

## Editions

Inquira comes in three editions:

- **Community Edition (CE)**: Free, local-only
- **Pro**: Adds RAG support and multiple workspaces
- **Enterprise**: Adds data connectors and MCP support