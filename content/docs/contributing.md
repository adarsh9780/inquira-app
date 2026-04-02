---
title: Contributing
description: How to contribute to Inquira.
---

# Contributing to Inquira

We welcome contributions from the community! Here's how you can help.

## Ways to Contribute

### Report Bugs
- Open an issue on GitHub
- Include steps to reproduce
- Share your OS and version

### Suggest Features
- Start a discussion on GitHub
- Describe the use case
- Explain why it would be valuable

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/my-feature`
3. **Make your changes**
4. **Run tests**: `make test`
5. **Commit**: `make git-commit` (create `commit_message.txt` first)
6. **Push**: `git push origin feature/my-feature`
7. **Open a Pull Request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/inquira-ce.git
cd inquira-ce

# Add upstream
git remote add upstream https://github.com/adarsh9780/inquira-ce.git

# Create a branch
git checkout -b feature/my-feature
```

## Code Style

- Python: Follow PEP 8, use `ruff` for linting
- JavaScript/TypeScript: Use `prettier` for formatting
- Rust: Follow `rustfmt` conventions

## Commit Messages

Write clear, concise commit messages:
- Start with a verb (Add, Fix, Update, Remove)
- First line: 50 characters or less
- Body: Explain the "why" not just the "what"

## Questions?

Join our [GitHub Discussions](https://github.com/adarsh9780/inquira-ce/discussions) or open an issue.