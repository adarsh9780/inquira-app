---
title: Installation and First Run
description: Install Inquira and run your first editable local analysis workflow.
---

# Installation and First Run

This guide gets you from a fresh install to your first local analysis workflow.

## Install The Desktop App

Download the current build from the [homepage](/#download).

- **macOS**: The homepage opens guided installer instructions. The app is not yet signed and notarized, so the macOS flow is explicit about the Homebrew install and quarantine permission step.
- **Windows**: The homepage links to the current Windows installer.

Read [Desktop Distribution](/docs/getting-started/distribution) for details about the unsigned macOS tradeoff.

## First Launch Checklist

1. Open Inquira.
2. Create or select a workspace.
3. Add a model provider key, or configure a local Ollama setup.
4. Import a CSV, Excel, JSON, or Parquet file.
5. Ask a question in plain English.
6. Review the generated Python.
7. Edit the code if needed.
8. Run it locally and inspect the table, chart, output logs, and saved artifacts.

## Model Setup

Inquira can work with:

- OpenRouter for access to many hosted models through one key
- Direct provider keys where supported
- Local Ollama setups for local model workflows

Cloud providers may receive prompts, schema/context, attachments, or snippets that are sent for a request. Workspace files and DuckDB tables stay on your machine by default.

## Importing Data

Supported formats:

| Format | Extensions | Notes |
| --- | --- | --- |
| CSV | `.csv` | Good for flat files and exports |
| Excel | `.xlsx`, `.xls` | Useful for spreadsheet workflows |
| Parquet | `.parquet` | Good for larger columnar datasets |
| JSON | `.json` | Useful for structured exports |

Inquira imports data into local DuckDB tables. Schema metadata is kept with the workspace so prompts, autocomplete, and generated code can refer to the right tables and columns.

## Your First Analysis Loop

Try a concrete request:

```text
Show the top 10 customers by revenue and create a bar chart.
```

Then inspect the workflow:

1. Open the generated answer.
2. Switch to the code pane.
3. Read the Python script.
4. Make a small edit, such as changing the limit or grouping.
5. Run the edited code.
6. Inspect the table, chart, and output panes.

That inspect-edit-rerun loop is the core of Inquira.

## Local Execution Warning

Python and terminal commands run locally with your operating-system user permissions and are not sandboxed. Review code before running it, use trusted files and prompts, and maintain backups.
