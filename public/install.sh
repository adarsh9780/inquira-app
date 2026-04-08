#!/usr/bin/env bash
set -euo pipefail

APP_NAME="Inquira"
TAP_NAME="adarsh9780/inquira"
CASK_NAME="inquira"
APP_PATH="/Applications/Inquira.app"
BREW_INSTALL_URL="https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh"
GUM_VERSION="0.17.0"

TMP_DIR="$(mktemp -d)"
GUM_BIN=""

BOLD='\033[1m'
INFO_COLOR='\033[38;5;244m'
SUCCESS_COLOR='\033[38;5;36m'
WARN_COLOR='\033[38;5;214m'
ACCENT_COLOR='\033[38;5;173m'
RESET='\033[0m'

cleanup() {
  rm -rf "${TMP_DIR}"
}
trap cleanup EXIT

tty_available() {
  [[ -r /dev/tty && -w /dev/tty ]]
}

download_file() {
  local url="$1"
  local output="$2"
  curl -fsSL --proto '=https' --tlsv1.2 -o "$output" "$url"
}

verify_checksum() {
  local asset="$1"
  local checksums_file="$2"
  local asset_path="$3"
  local expected=""

  expected="$(awk -v asset="$asset" '$2 == asset { print $1 }' "$checksums_file" | head -n1)"
  if [[ -z "$expected" ]]; then
    return 1
  fi

  if command -v shasum >/dev/null 2>&1; then
    local actual=""
    actual="$(shasum -a 256 "$asset_path" | awk '{print $1}')"
    [[ "$actual" == "$expected" ]]
    return
  fi

  if command -v sha256sum >/dev/null 2>&1; then
    local actual=""
    actual="$(sha256sum "$asset_path" | awk '{print $1}')"
    [[ "$actual" == "$expected" ]]
    return
  fi

  return 1
}

bootstrap_gum() {
  if command -v gum >/dev/null 2>&1; then
    GUM_BIN="$(command -v gum)"
    return 0
  fi

  if ! tty_available; then
    return 1
  fi

  if ! command -v curl >/dev/null 2>&1 || ! command -v tar >/dev/null 2>&1; then
    return 1
  fi

  local arch=""
  case "$(uname -m)" in
    arm64|aarch64) arch="arm64" ;;
    x86_64|amd64) arch="x86_64" ;;
    *) return 1 ;;
  esac

  local asset="gum_${GUM_VERSION}_Darwin_${arch}.tar.gz"
  local base_url="https://github.com/charmbracelet/gum/releases/download/v${GUM_VERSION}"
  local asset_path="${TMP_DIR}/${asset}"
  local checksum_path="${TMP_DIR}/checksums.txt"

  download_file "${base_url}/${asset}" "$asset_path" || return 1
  download_file "${base_url}/checksums.txt" "$checksum_path" || return 1
  verify_checksum "$asset" "$checksum_path" "$asset_path" || return 1

  tar -xzf "$asset_path" -C "$TMP_DIR" >/dev/null 2>&1 || return 1

  GUM_BIN="$(find "$TMP_DIR" -type f -name gum | head -n1 || true)"
  if [[ -z "$GUM_BIN" ]]; then
    return 1
  fi

  chmod +x "$GUM_BIN" >/dev/null 2>&1 || true
}

info() {
  local message="$1"
  if [[ -n "$GUM_BIN" ]]; then
    "$GUM_BIN" log --level info "$message"
  else
    printf "${INFO_COLOR}==>${RESET} %s\n" "$message"
  fi
}

success() {
  local message="$1"
  if [[ -n "$GUM_BIN" ]]; then
    printf '%s %s\n' "$("$GUM_BIN" style --foreground "#00b894" --bold "✓")" "$message"
  else
    printf "${SUCCESS_COLOR}✓${RESET} %s\n" "$message"
  fi
}

warn() {
  local message="$1"
  if [[ -n "$GUM_BIN" ]]; then
    "$GUM_BIN" log --level warn "$message"
  else
    printf "${WARN_COLOR}Warning:${RESET} %s\n" "$message" >&2
  fi
}

section() {
  local message="$1"
  if [[ -n "$GUM_BIN" ]]; then
    printf '%s\n' "$("$GUM_BIN" style --foreground "#cc8252" --bold "$message")"
  else
    printf "\n${ACCENT_COLOR}${BOLD}%s${RESET}\n" "$message"
  fi
}

prompt_yes_no() {
  local question="$1"

  if ! tty_available; then
    return 1
  fi

  if [[ -n "$GUM_BIN" ]]; then
    "$GUM_BIN" confirm "$question" < /dev/tty > /dev/tty
    return $?
  fi

  local reply=""
  read -r -p "${question} [y/N] " reply < /dev/tty
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
    success "Homebrew already available"
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

  success "Homebrew installed"
}

install_inquira() {
  info "Tapping ${TAP_NAME}"
  brew tap "${TAP_NAME}"

  info "Installing ${APP_NAME} via Homebrew Cask"
  brew install --cask "${CASK_NAME}"
  success "${APP_NAME} installed via Homebrew"
}

handle_quarantine() {
  if [[ ! -d "${APP_PATH}" ]]; then
    warn "${APP_PATH} was not found after installation."
    return 1
  fi

  echo
  info "macOS may still block ${APP_NAME} because the app is not signed or notarized yet."
  info "If you approve, this script can remove the quarantine flag from ${APP_PATH}."

  if prompt_yes_no "Do you want to run xattr -dr com.apple.quarantine on ${APP_NAME}?"; then
    xattr -dr com.apple.quarantine "${APP_PATH}"
    success "Quarantine flag removed for ${APP_NAME}"
  else
    info "Skipped quarantine removal."
    info "If macOS blocks the app later, you can run:"
    printf "  xattr -dr com.apple.quarantine %s\n" "${APP_PATH}"
  fi
}

print_next_steps() {
  section "Next steps"
  cat <<EOF
Updates:
  brew upgrade --cask ${CASK_NAME}

Uninstall:
  brew uninstall --cask ${CASK_NAME}

If macOS still blocks the app later:
  xattr -dr com.apple.quarantine ${APP_PATH}

We plan to move to proper signed and notarized macOS distribution once the project has sustainable support to cover Apple's developer program costs.
EOF
}

main() {
  require_macos
  bootstrap_gum || true

  section "Inquira macOS installer"
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
