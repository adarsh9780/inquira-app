---
title: Welcome to Inquira
description: Inquira CE is a local-first AI data analysis desktop app with editable Python workflows.
---

# Welcome to Inquira

Inquira CE is a local-first AI data analysis desktop app. You ask questions about your data, Inquira generates Python, runs it locally against your workspace, and shows the code, results, charts, logs, and artifacts that produced the answer.

The important difference: Inquira is not a black-box data chatbot. It is an inspectable Python workflow. You can read the generated code, edit it, rerun it, debug it, and keep the result with the rest of your project.

## What Inquira Does

1. Creates a local DuckDB workspace for your project.
2. Imports CSV, Excel, JSON, and Parquet files into local tables.
3. Uses your selected model provider to generate analysis code from natural-language questions.
4. Executes Python in a workspace-scoped local Jupyter runtime.
5. Saves tables, charts, scalar results, logs, generated code, and turn artifacts.
6. Lets you continue later with your workspace, chat history, editor state, and artifacts intact.

Workspace data is stored and processed locally by default. If you use a cloud model provider, prompts and selected context are sent to that provider. If you use local models through Ollama, the model step can stay local too.

## Core Features

- **Editable AI-Generated Python**: Review, change, rerun, undo or redo, sync table names, and export `.py` files instead of trusting a hidden answer.
- **Local Python Runtime**: Generated and manually edited scripts run in a workspace-scoped Jupyter runtime on your machine.
- **Local DuckDB Workspaces**: Import CSV, Excel, JSON, and Parquet files into fast local DuckDB tables that stay grouped by project.
- **Data-Aware Editor**: The code editor includes Python support, data-aware autocomplete, and a source switch between agent-generated and user-edited code.
- **Tables, Charts, Logs, and Artifacts**: Inspect generated tables, Plotly charts, output logs, errors, scalar values, and saved turn artifacts.
- **Conversation Tree**: Revisit branches of analysis, choose final turns, and keep the path that produced a result.
- **Persistent Projects**: Workspaces save datasets, conversations, artifacts, editor state, selected panes, and local results across app restarts.
- **Built-In Terminal**: Use the workspace terminal for package installs, file checks, and debugging when chat is not enough.
- **Model Flexibility**: Use OpenRouter, direct provider keys, or local Ollama setups. API keys are saved locally and masked in settings.

## Who It Is For

### Data Scientists and Analysts

Use Inquira to speed up the repetitive parts of analysis while keeping the code visible and editable. It is useful when you want AI help but still need a reproducible path from question to result.

### Operators With Local Files

Use Inquira when you have CSV, Excel, JSON, or Parquet files and need quick exploration without sending the raw workspace to a hosted analytics service.

### Python-Literate Power Users

Use the editor and terminal directly when you want to step outside the chat flow, install a package, debug a query, or rerun a script manually.

:::warning
Python and terminal commands run locally with your operating-system user permissions and are not sandboxed. Review code before running it, maintain backups, and verify AI-generated results.
:::

## Next Steps

Download the desktop app from the [homepage](/#download).

Read [Installation and First Run](/docs/getting-started/installation) if you are setting up Inquira for the first time.

Read [Desktop Distribution](/docs/getting-started/distribution) if you want the plain explanation of the current macOS and Windows installer flow.

Read [Workspace Management](/docs/features/workspace) if you want to understand how projects, datasets, artifacts, and runtime state fit together.
