const DEFAULT_SITE_URLS = ['https://inquiraai.com']
const DEFAULT_DOWNLOADS_MANIFEST_URL = 'https://downloads.inquiraai.com/latest.json'
const WAIT_BETWEEN_ATTEMPTS_MS = 5000
const DEFAULT_ATTEMPTS = 6

function splitCsv(value) {
  return String(value || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}

function normalizeSiteUrls() {
  const explicitUrls = splitCsv(process.env.SITE_URLS)
  if (explicitUrls.length > 0) {
    return [...new Set(explicitUrls.map(normalizeUrl).filter(Boolean))]
  }

  const domainPatterns = splitCsv(process.env.CLOUDFLARE_CUSTOM_DOMAIN_PATTERNS)
    .filter((pattern) => !pattern.includes('*'))
    .map((pattern) => normalizeUrl(pattern))
    .filter(Boolean)

  if (domainPatterns.length > 0) {
    return [...new Set(domainPatterns)]
  }

  return DEFAULT_SITE_URLS
}

function normalizeUrl(value) {
  const trimmed = String(value || '').trim()
  if (!trimmed) return null
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed.replace(/\/+$/, '')
  }
  return `https://${trimmed.replace(/\/+$/, '')}`
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchWithRetries(url, options = {}) {
  let lastError = null

  for (let attempt = 1; attempt <= DEFAULT_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        ...options,
        headers: {
          accept: 'text/html,application/json;q=0.9,*/*;q=0.8',
          ...(options.headers || {}),
        },
      })

      if (response.ok) {
        return response
      }

      lastError = new Error(`HTTP ${response.status} ${response.statusText}`)
    } catch (error) {
      lastError = error
    }

    if (attempt < DEFAULT_ATTEMPTS) {
      console.log(`Retrying ${url} (${attempt}/${DEFAULT_ATTEMPTS})`)
      await wait(WAIT_BETWEEN_ATTEMPTS_MS)
    }
  }

  throw lastError
}

async function assertPage(url, matcher, description) {
  const response = await fetchWithRetries(url)
  const contentType = response.headers.get('content-type') || ''
  const body = await response.text()

  if (!contentType.includes('text/html')) {
    throw new Error(`${description} did not return HTML. Received content-type: ${contentType || 'unknown'}`)
  }

  if (/"statusCode"\s*:\s*404/.test(body) || /Page not found/i.test(body)) {
    throw new Error(`${description} returned a not-found response`)
  }

  if (matcher && !matcher.test(body)) {
    throw new Error(`${description} loaded, but the expected content was missing`)
  }

  console.log(`Verified ${description}: ${url}`)
}

async function assertJson(url, requiredKeys) {
  const response = await fetchWithRetries(url, {
    headers: {
      accept: 'application/json,text/plain;q=0.9,*/*;q=0.8',
    },
  })
  const contentType = response.headers.get('content-type') || ''
  const body = await response.text()

  let parsed
  try {
    parsed = JSON.parse(body)
  } catch (error) {
    throw new Error(`Download manifest is not valid JSON at ${url}`)
  }

  for (const key of requiredKeys) {
    if (!parsed[key]) {
      throw new Error(`Download manifest at ${url} is missing ${key}`)
    }
  }

  console.log(`Verified download manifest: ${url} (${contentType || 'unknown content-type'})`)
}

async function main() {
  const siteUrls = normalizeSiteUrls()
  const downloadsManifestUrl = normalizeUrl(process.env.DOWNLOADS_MANIFEST_URL)
    || process.env.NUXT_PUBLIC_DOWNLOADS_MANIFEST_URL
    || DEFAULT_DOWNLOADS_MANIFEST_URL

  console.log(`Checking deployment targets: ${siteUrls.join(', ')}`)

  for (const siteUrl of siteUrls) {
    await assertPage(siteUrl, /href="\/docs"|Read Docs/i, 'homepage')
    await assertPage(`${siteUrl}/docs`, /Welcome to Inquira|Getting Started/i, 'docs landing page')
  }

  await assertJson(downloadsManifestUrl, ['version', 'macos_arm64_url', 'windows_x64_url'])
}

await main()
