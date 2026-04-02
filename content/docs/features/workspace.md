---
title: Workspace Management
description: Managing your Inquira workspaces effectively.
---

# Workspace Management

Workspaces in Inquira provide isolated environments for your data analysis projects.

## What is a Workspace?

A workspace is a self-contained environment that includes:
- Local DuckDB database
- Imported data files
- Chat history and analysis artifacts
- Python execution state

## Creating a Workspace

1. Click **New Workspace** in the sidebar
2. Give your workspace a descriptive name
3. Start importing data or begin analyzing

## Workspace Persistence

Workspaces are automatically saved:
- **On close**: All state is persisted to disk
- **On import**: Data files are linked/referenced
- **Continuously**: Chat messages and artifacts saved in real-time

## Switching Workspaces

Use the workspace switcher in the top-left corner to:
- Switch between different projects
- Quick-access recent workspaces
- Create new workspaces

## Data Management

### Importing Data
Drag and drop files into the workspace, or use the import button.

Supported formats:
- CSV
- Excel (.xlsx, .xls)
- Parquet
- JSON

### Exporting Results
Export analysis results as:
- CSV
- Excel
- PNG (for charts)

## Best Practices

- **One project per workspace**: Keep related data and analysis together
- **Regular backups**: Copy your workspace folder for important projects
- **Naming conventions**: Use clear names to identify workspaces easily