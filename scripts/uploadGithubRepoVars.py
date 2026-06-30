#!/usr/bin/env python3
import argparse
import re
import subprocess
import sys
from pathlib import Path


DEFAULT_REPO = "adarsh9780/inquira-app"
DEFAULT_ENV_FILE = "repo_vars.txt"
SECRET_NAME_PATTERN = re.compile(r"(SECRET|TOKEN|PASSWORD|PRIVATE|CLIENT_SECRET|API_KEY)", re.IGNORECASE)
KEY_PATTERN = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*$")


def parse_env_value(raw_value):
    value = raw_value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
        unquoted = value[1:-1]
        if value[0] == '"':
            return (
                unquoted
                .replace("\\n", "\n")
                .replace("\\r", "\r")
                .replace("\\t", "\t")
            )
        return unquoted

    return re.sub(r"\s+#.*$", "", value).strip()


def parse_vars_file(path):
    variables = {}
    duplicates = []

    for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue

        if stripped.startswith("export "):
            stripped = stripped[len("export "):].lstrip()

        if "=" not in stripped:
            raise ValueError(f"{path}:{line_number}: expected KEY=value")

        key, raw_value = stripped.split("=", 1)
        key = key.strip()
        value = parse_env_value(raw_value)

        if not KEY_PATTERN.match(key):
            raise ValueError(f"{path}:{line_number}: invalid variable name: {key}")

        if SECRET_NAME_PATTERN.search(key):
            raise ValueError(
                f"{path}:{line_number}: refusing to upload secret-looking key as a repo variable: {key}"
            )

        if key in variables:
            if variables[key] != value:
                raise ValueError(f"{path}:{line_number}: duplicate key with different value: {key}")
            duplicates.append(key)
            continue

        variables[key] = value

    return variables, duplicates


def set_repo_variable(repo, key, value, dry_run=False):
    if dry_run:
        print(f"DRY RUN: would set {key}")
        return

    subprocess.run(
        ["gh", "variable", "set", key, "--repo", repo, "--body", value],
        check=True,
    )
    print(f"Set {key}")


def main():
    parser = argparse.ArgumentParser(description="Upload dotenv-style repo variables to GitHub Actions.")
    parser.add_argument("--file", default=DEFAULT_ENV_FILE, help=f"Variables file to read. Default: {DEFAULT_ENV_FILE}")
    parser.add_argument("--repo", default=DEFAULT_REPO, help=f"GitHub repo in OWNER/REPO form. Default: {DEFAULT_REPO}")
    parser.add_argument("--dry-run", action="store_true", help="Print variable names without uploading them.")
    args = parser.parse_args()

    path = Path(args.file)
    if not path.exists():
        raise SystemExit(f"Variables file not found: {path}")

    variables, duplicates = parse_vars_file(path)
    if not variables:
        raise SystemExit(f"No variables found in {path}")

    if duplicates:
        duplicate_names = ", ".join(sorted(set(duplicates)))
        print(f"Skipping duplicate entries with the same value: {duplicate_names}", file=sys.stderr)

    for key in sorted(variables):
        set_repo_variable(args.repo, key, variables[key], dry_run=args.dry_run)

    print(f"Processed {len(variables)} repository variables for {args.repo}.")


if __name__ == "__main__":
    main()
