const PUBLIC_DISTRIBUTION_URL = 'https://inquiraai.com/docs/getting-started/distribution'

export function fallbackDownloadManifest() {
  return {
    version: 'latest',
    macosArm64Url: PUBLIC_DISTRIBUTION_URL,
    windowsX64Url: PUBLIC_DISTRIBUTION_URL,
    publishedAt: '',
    releaseNotesUrl: PUBLIC_DISTRIBUTION_URL,
  }
}

export function isPricingEnabled(value) {
  return value === true || value === 'true'
}

export function normalizeDownloadManifest(rawManifest) {
  const fallback = fallbackDownloadManifest()
  if (!rawManifest || typeof rawManifest !== 'object') {
    return fallback
  }

  const version = typeof rawManifest.version === 'string' && rawManifest.version.trim()
    ? rawManifest.version.trim()
    : fallback.version
  const macosArm64Url = typeof rawManifest.macos_arm64_url === 'string' && rawManifest.macos_arm64_url.trim()
    ? rawManifest.macos_arm64_url.trim()
    : fallback.macosArm64Url
  const windowsX64Url = typeof rawManifest.windows_x64_url === 'string' && rawManifest.windows_x64_url.trim()
    ? rawManifest.windows_x64_url.trim()
    : fallback.windowsX64Url
  const publishedAt = typeof rawManifest.published_at === 'string' ? rawManifest.published_at : fallback.publishedAt
  const releaseNotesUrl = typeof rawManifest.release_notes_url === 'string' && rawManifest.release_notes_url.trim()
    ? rawManifest.release_notes_url.trim()
    : fallback.releaseNotesUrl

  return {
    version,
    macosArm64Url,
    windowsX64Url,
    publishedAt,
    releaseNotesUrl,
  }
}

export function getDownloadUrl(manifest, platform) {
  return platform === 'macOS' ? manifest.macosArm64Url : manifest.windowsX64Url
}
