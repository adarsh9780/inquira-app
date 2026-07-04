---
title: Roadmap
description: Current completed capabilities and future directions for Inquira.
---

# Roadmap

This roadmap separates what the public app already does from the larger product directions that are still planned.

## Completed In CE

- Local DuckDB workspaces
- Multiple local workspaces
- CSV, Excel, JSON, and Parquet import
- Natural-language analysis requests
- AI-generated Python workflows
- Editable code pane with data-aware autocomplete
- Local Jupyter execution
- Agent and edited code source switching
- Table, chart, output, scalar, and artifact inspection
- Plotly chart rendering
- Persistent conversations and workspace state
- Conversation tree and turn navigation
- Built-in workspace terminal with consent flow
- BYOK model setup
- OpenRouter-oriented model access
- Local Ollama-oriented workflows
- macOS and Windows desktop builds

## In Progress

- More reliable cold starts and runtime readiness states
- Faster dataset ingestion feedback
- Better schema generation and schema refresh flows
- More helpful code generation and repair prompts
- Stronger artifact browsing and export workflows
- More polished product demos and docs

## Planned

- Multi-file analysis improvements for related datasets
- Direct database connectors such as PostgreSQL and MySQL
- API and SaaS data source connectors
- Deeper RAG support
- Custom command workflows
- More visualization controls
- Scheduled or repeatable analysis tasks
- Plugin and MCP-oriented extension points

## Enterprise Direction

- Team workspace management
- SSO and identity integrations
- Audit logging
- Centralized policy controls
- Custom connectors
- Managed support

## Security Boundary

Operating-system sandboxing is not currently part of the execution model. Python and terminal commands run with the desktop user's permissions. Any future isolation model would need a separate design, threat model, and product release.
