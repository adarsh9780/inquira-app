---
title: Getting Data In
description: Learn how to import and work with your data in Inquira.
---

# Getting Data In

Inquira supports a variety of data formats and makes it easy to get your data into a local DuckDB workspace for fast, privacy-preserving analysis.

## Supported Formats

Inquira natively supports the following file formats:

| Format | Extension | Description |
|--------|-----------|-------------|
| CSV | `.csv` | Comma-separated values |
| Excel | `.xlsx`, `.xls` | Microsoft Excel spreadsheets |
| Parquet | `.parquet` | Columnar data format |
| JSON | `.json` | JavaScript Object Notation |

## How It Works

1. **Drop or Import**: Simply drag and drop your files into the Inquira workspace, or use the import button to browse for files.

2. **Automatic Detection**: Inquira automatically detects the file format and schema of your data.

3. **DuckDB Conversion**: Your data is converted into a local DuckDB table, enabling high-speed queries even on large datasets.

4. **Start Querying**: Once your data is imported, you can start asking questions in natural language.

## Data Workspace

Each Inquira workspace maintains its own local DuckDB instance. This means:

- Your data stays **100% local** on your machine
- Queries run **extremely fast** thanks to DuckDB's columnar storage
- You can have **multiple workspaces** to organize different projects

## Best Practices

- Keep your data files in a consistent location for easy re-import
- Use clear column names in your data for better AI understanding
- For very large files, consider sampling first to test your analysis approach