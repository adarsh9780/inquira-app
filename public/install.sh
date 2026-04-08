#!/usr/bin/env bash
set -euo pipefail

APP_NAME="Inquira"
TAP_NAME="adarsh9780/inquira"
CASK_NAME="inquira"
APP_PATH="/Applications/Inquira.app"
BREW_INSTALL_URL="https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh"

info() {
  printf '==> %s\n' "$1"
}

warn() {
  printf 'Warning: %s\n' "$1" >&2
}

prompt_yes_no() {
  local question="$1"
  local reply
  read -r -p "${question} [y/N] " reply
  [[ "${reply:-}" =~ ^[Yy]([Ee][Ss])?$ ]]
}

require_macos() {
  if [[ "$(uname -s)" != "Darwin" ]]; then
    warn "This installer is for macOS only."
    warn "Use the Windows download from https://inquiraai.com for Windows installs."
    exit 1
  fi
}

ensure_homebrew() {
  if command -v brew >/dev/null 2>&1; then
    return 0
  fi

  info "Homebrew is required to install ${APP_NAME}."
  if ! prompt_yes_no "Homebrew is not installed. Do you want to install it now?"; then
    warn "Homebrew installation declined. Aborting."
    exit 1
  fi

  /bin/bash -c "$(curl -fsSL "${BREW_INSTALL_URL}")"

  if [[ -x /opt/homebrew/bin/brew ]]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  elif [[ -x /usr/local/bin/brew ]]; then
    eval "$(/usr/local/bin/brew shellenv)"
  fi

  if ! command -v brew >/dev/null 2>&1; then
    warn "Homebrew installed, but brew is not on PATH in this shell yet."
    warn "Open a new terminal and rerun this installer."
    exit 1
  fi
}

install_inquira() {
  info "Tapping ${TAP_NAME}"
  brew tap "${TAP_NAME}"

  info "Installing ${APP_NAME} via Homebrew Cask"
  brew install --cask "${CASK_NAME}"
}

handle_quarantine() {
  if [[ ! -d "${APP_PATH}" ]]; then
    warn "${APP_PATH} was not found after installation."
    return 1
  fi

  echo
  echo "macOS may still block ${APP_NAME} because the app is not signed or notarized yet."
  echo "If you approve, this script can remove the quarantine flag from:"
  echo "  ${APP_PATH}"
  echo

  if prompt_yes_no "Do you want to run xattr -dr com.apple.quarantine on ${APP_NAME}?"; then
    xattr -dr com.apple.quarantine "${APP_PATH}"
    info "Quarantine flag removed for ${APP_NAME}"
  else
    info "Skipped quarantine removal."
    echo "If macOS blocks the app later, you can run:"
    echo "  xattr -dr com.apple.quarantine ${APP_PATH}"
  fi
}

print_next_steps() {
  cat <<EOF

${APP_NAME} is installed.

Updates:
  brew upgrade --cask ${CASK_NAME}

If macOS still blocks the app later:
  xattr -dr com.apple.quarantine ${APP_PATH}

We plan to move to proper signed and notarized macOS distribution once the project has sustainable support to cover Apple's developer program costs.
EOF
}

main() {
  require_macos

  cat <<EOF
This installer will:
  1. Install Homebrew if it is missing.
  2. Tap ${TAP_NAME}.
  3. Install ${APP_NAME} with Homebrew Cask.
  4. Ask before removing the macOS quarantine flag from ${APP_PATH}.
EOF

  ensure_homebrew
  install_inquira
  handle_quarantine || true
  print_next_steps
}

main "$@"
