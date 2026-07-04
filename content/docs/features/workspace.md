---
title: Workspace Management
description: How Inquira workspaces keep data, code, conversations, and artifacts together.
---

# Workspace Management

An Inquira workspace is a local project container for analysis. It keeps your data, generated code, edited code, conversations, artifacts, runtime state, and result surfaces together.

Workspaces are not operating-system sandboxes. Python and terminal commands still run with your user permissions.

## What A Workspace Contains

- Local DuckDB database
- Imported CSV, Excel, JSON, and Parquet datasets
- Dataset schema metadata
- Chat history
- Conversation tree and turn metadata
- Generated Python
- User-edited Python
- Tables, charts, logs, scalar values, and saved artifacts
- Local editor and UI state
- Workspace-scoped Python runtime state while the runtime is active
- Terminal working directory for that workspace

## Why Workspaces Matter

Inquira is designed for analysis that continues over time. A workspace keeps the context that makes an answer explainable:

- Which data was used
- Which prompt started the analysis
- Which code was generated
- Which code you changed
- Which tables and charts were produced
- Which turn became the final answer

This makes Inquira closer to a local analysis notebook and project folder than a one-off chat box.

## Creating A Workspace

1. Open the sidebar.
2. Open settings.
3. Choose **New Workspace**.
4. Give the workspace a clear project name.
5. Add datasets or start a conversation.

Use one workspace per project, client, domain, or investigation. This keeps schema context and generated artifacts easier to understand later.

## Adding Data

You can import:

- CSV
- Excel (`.xlsx`, `.xls`)
- Parquet
- JSON

Inquira prepares local DuckDB tables and keeps dataset metadata with the workspace. The schema information helps the agent generate better code and helps the editor provide data-aware completions.

## Working With Code

The code pane is a first-class workspace surface. You can:

- Review agent-generated Python
- Edit the script manually
- Switch between agent and edited versions
- Run the script locally
- Run selected snippets
- Sync table names after switching datasets
- Undo or redo edits
- Download the script as a `.py` file

Use this whenever the first answer is close but needs a filter, grouping, chart tweak, package import, or manual debugging.

## Inspecting Results

Analysis outputs are shown as separate result surfaces:

- **Table** for dataframe artifacts
- **Chart** for Plotly figures
- **Output** for logs, errors, scalar values, and artifact previews
- **Tree** for the path of turns that produced the result

Saved artifacts let you return to a result without relying only on the natural-language summary.

## Persistence

Workspaces save state continuously:

- On dataset import
- When conversations and turns are created
- When generated artifacts are captured
- When editor and UI state changes
- When the app closes

You can close Inquira and return later with the workspace, conversations, editor state, and artifacts still available.

## Terminal Access

The workspace terminal runs commands in the active workspace context. It is useful for package installs, local file checks, and debugging.

Terminal execution requires user consent, runs with your operating-system user permissions, and is not sandboxed. Some commands may be blocked by terminal policy.

## Best Practices

- Use one workspace per real project.
- Keep source files in stable locations.
- Name workspaces after the business question or dataset family.
- Review generated Python before running important analysis.
- Save or export scripts when an analysis becomes important.
- Keep backups of important source data and workspace folders.
