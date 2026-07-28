#!/usr/bin/env bash
set -euo pipefail

APP_NAME="Inquira"
APP_PATH="/Applications/Inquira.app"
MANIFEST_URL="https://downloads.inquiraai.com/latest.json"

TMP_DIR="$(mktemp -d)"
MOUNT_POINT="${TMP_DIR}/mounted"

BOLD='\033[1m'
INFO_COLOR='\033[38;5;244m'
SUCCESS_COLOR='\033[38;5;36m'
WARN_COLOR='\033[38;5;214m'
ACCENT_COLOR='\033[38;5;173m'
RESET='\033[0m'

cleanup() {
  if mount | grep -Fq "on ${MOUNT_POINT} "; then
    hdiutil detach "$MOUNT_POINT" -quiet >/dev/null 2>&1 || true
  fi
  rm -rf "${TMP_DIR}"
}
trap cleanup EXIT

info() {
  printf "${INFO_COLOR}==>${RESET} %s\n" "$1"
}

success() {
  printf "${SUCCESS_COLOR}✓${RESET} %s\n" "$1"
}

warn() {
  printf "${WARN_COLOR}Warning:${RESET} %s\n" "$1" >&2
}

section() {
  printf "\n${ACCENT_COLOR}${BOLD}%s${RESET}\n" "$1"
}

prompt_yes_no() {
  local question="$1"
  local reply=""

  if [[ ! -r /dev/tty || ! -w /dev/tty ]]; then
    return 1
  fi
  read -r -p "${question} [y/N] " reply < /dev/tty
  [[ "${reply:-}" =~ ^[Yy]([Ee][Ss])?$ ]]
}

require_supported_macos() {
  if [[ "$(uname -s)" != "Darwin" ]]; then
    warn "This installer is for macOS only."
    warn "Use the Windows download from https://inquiraai.com on Windows."
    exit 1
  fi

  case "$(uname -m)" in
    arm64|aarch64) ;;
    *)
      warn "The current Inquira macOS release supports Apple Silicon only."
      exit 1
      ;;
  esac

  for command in curl hdiutil plutil shasum ditto; do
    if ! command -v "$command" >/dev/null 2>&1; then
      warn "Required macOS command is missing: $command"
      exit 1
    fi
  done
}

download_file() {
  local url="$1"
  local output="$2"
  curl -fsSL --proto '=https' --tlsv1.2 -o "$output" "$url"
}

manifest_value() {
  local key="$1"
  local manifest_path="$2"
  plutil -extract "$key" raw -o - "$manifest_path"
}

load_release() {
  local manifest_path="$1"

  info "Reading the current release manifest"
  download_file "$MANIFEST_URL" "$manifest_path"

  RELEASE_VERSION="$(manifest_value version "$manifest_path")"
  RELEASE_URL="$(manifest_value macos_arm64_url "$manifest_path")"
  RELEASE_SHA256="$(manifest_value macos_arm64_sha256 "$manifest_path" | tr '[:upper:]' '[:lower:]')"

  if [[ ! "$RELEASE_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    warn "The release manifest contains an invalid version."
    exit 1
  fi
  if [[ ! "$RELEASE_URL" =~ ^https://downloads\.inquiraai\.com/v[0-9]+\.[0-9]+\.[0-9]+/[^/]+\.dmg$ ]]; then
    warn "The release manifest contains an unexpected macOS download URL."
    exit 1
  fi
  if [[ ! "$RELEASE_SHA256" =~ ^[0-9a-f]{64}$ ]]; then
    warn "The release manifest contains an invalid macOS checksum."
    exit 1
  fi
}

download_and_verify_release() {
  local dmg_path="$1"
  local actual_sha256=""

  info "Downloading ${APP_NAME} ${RELEASE_VERSION}"
  download_file "$RELEASE_URL" "$dmg_path"

  actual_sha256="$(shasum -a 256 "$dmg_path" | awk '{print $1}')"
  if [[ "$actual_sha256" != "$RELEASE_SHA256" ]]; then
    warn "The downloaded DMG did not match the published SHA-256 checksum."
    exit 1
  fi
  success "SHA-256 checksum verified"
}

mount_release() {
  local dmg_path="$1"

  mkdir -p "$MOUNT_POINT"
  info "Opening the verified disk image"
  hdiutil attach "$dmg_path" -mountpoint "$MOUNT_POINT" -nobrowse -readonly -quiet

  SOURCE_APP="$(find "$MOUNT_POINT" -maxdepth 2 -type d -name 'Inquira.app' -print -quit)"
  if [[ -z "$SOURCE_APP" || ! -d "$SOURCE_APP" ]]; then
    warn "The verified disk image does not contain Inquira.app."
    exit 1
  fi
}

remove_existing_app() {
  if [[ ! -e "$APP_PATH" ]]; then
    return 0
  fi
  if ! prompt_yes_no "Inquira is already installed. Replace it with ${RELEASE_VERSION}?"; then
    warn "Installation cancelled. The existing application was not changed."
    exit 1
  fi

  if [[ -w "$(dirname "$APP_PATH")" ]]; then
    rm -rf "$APP_PATH"
  else
    sudo rm -rf "$APP_PATH"
  fi
}

install_application() {
  remove_existing_app
  info "Installing ${APP_NAME} in /Applications"

  if [[ -w "$(dirname "$APP_PATH")" ]]; then
    ditto "$SOURCE_APP" "$APP_PATH"
  else
    sudo ditto "$SOURCE_APP" "$APP_PATH"
  fi
  success "${APP_NAME} ${RELEASE_VERSION} installed"
}

handle_quarantine() {
  echo
  info "This release is checksum-verified but is not signed or notarized by Apple."
  info "macOS may block it until the quarantine attribute is removed."

  if prompt_yes_no "Remove the quarantine attribute from ${APP_NAME}?"; then
    if [[ -w "$APP_PATH" ]]; then
      xattr -dr com.apple.quarantine "$APP_PATH"
    else
      sudo xattr -dr com.apple.quarantine "$APP_PATH"
    fi
    success "Quarantine attribute removed"
  else
    info "The quarantine attribute was left unchanged."
    printf "If macOS blocks the app, run:\n  sudo xattr -dr com.apple.quarantine %s\n" "$APP_PATH"
  fi
}

print_next_steps() {
  section "Next steps"
  cat <<EOF
Open Inquira:
  open "${APP_PATH}"

Update:
  Rerun this installer command.

Uninstall:
  sudo rm -rf "${APP_PATH}"

Release details:
  https://inquiraai.com/docs/getting-started/distribution
EOF
}

main() {
  require_supported_macos

  section "Inquira macOS installer"
  cat <<EOF
This installer will:
  1. Read the current release manifest from downloads.inquiraai.com.
  2. Download the Apple Silicon DMG and verify its SHA-256 checksum.
  3. Install Inquira in /Applications.
  4. Ask before removing the macOS quarantine attribute.
EOF

  local manifest_path="${TMP_DIR}/latest.json"
  local dmg_path="${TMP_DIR}/inquira.dmg"
  load_release "$manifest_path"
  download_and_verify_release "$dmg_path"
  mount_release "$dmg_path"
  install_application
  handle_quarantine
  print_next_steps
}

main "$@"
