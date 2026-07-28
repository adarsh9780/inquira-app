import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { mkdtemp, mkdir, readdir, rm, copyFile, writeFile, access } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

function parseArgs(argv) {
  const args = {}
  for (let index = 2; index < argv.length; index += 1) {
    const token = argv[index]
    if (!token.startsWith('--')) continue
    const key = token.slice(2)
    const value = argv[index + 1]
    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for --${key}`)
    }
    args[key] = value
    index += 1
  }
  return args
}

function printHelp() {
  console.log(`Usage:
  node scripts/uploadPublicDownloadsToR2.mjs --version 0.5.27 [--uploads-root ~/Downloads/inquira-uploads] [--base-url https://downloads.inquiraai.com] [--release-notes-url <url>] [--bucket <r2 bucket>]

Required:
  --version             Release version. Accepts 0.5.27 or v0.5.27.

Environment:
  CLOUDFLARE_API_TOKEN
  CLOUDFLARE_ACCOUNT_ID
  R2_BUCKET (or CLOUDFLARE_R2_BUCKET)

Optional:
  --uploads-root        Directory containing vX.YZ release folder. If omitted, script auto-checks ~/Downloads/inquira-uploads then ~/Downloads/inquira-upload.
  --base-url            Public base URL for download links.
  --release-notes-url   URL included in manifest.
  --bucket              R2 bucket name (overrides env vars).`)
}

function normalizeVersion(version) {
  const trimmed = String(version || '').trim()
  if (!trimmed) throw new Error('Missing required --version value')
  return trimmed.startsWith('v') ? trimmed : `v${trimmed}`
}

async function canAccessDirectory(dirPath) {
  try {
    await access(dirPath)
    return true
  } catch {
    return false
  }
}

function expandUserPath(inputPath) {
  if (!inputPath) return inputPath
  if (inputPath === '~') return os.homedir()
  if (inputPath.startsWith('~/')) {
    return path.join(os.homedir(), inputPath.slice(2))
  }
  return inputPath
}

async function resolveUploadsRoot(explicitUploadsRoot) {
  if (explicitUploadsRoot) {
    return path.resolve(expandUserPath(explicitUploadsRoot))
  }

  const candidates = [
    path.join(os.homedir(), 'Downloads', 'inquira-uploads'),
    path.join(os.homedir(), 'Downloads', 'inquira-upload')
  ]

  for (const candidate of candidates) {
    if (await canAccessDirectory(candidate)) {
      return candidate
    }
  }

  throw new Error(`Could not find uploads root. Checked: ${candidates.join(', ')}`)
}

async function sha256(filePath) {
  const hash = createHash('sha256')
  await new Promise((resolve, reject) => {
    const stream = createReadStream(filePath)
    stream.on('data', chunk => hash.update(chunk))
    stream.on('error', reject)
    stream.on('end', resolve)
  })
  return hash.digest('hex')
}

function pickInstaller(files, extension) {
  const matches = files
    .filter(file => file.isFile() && file.name.toLowerCase().endsWith(extension))
    .map(file => file.name)
    .sort()

  if (matches.length === 0) {
    throw new Error(`No ${extension} file found`)
  }
  if (matches.length > 1) {
    console.warn(`Found multiple ${extension} files. Using ${matches[0]}.`)
  }
  return matches[0]
}

function uploadObject(bucket, key, filePath, contentType) {
  execFileSync(
    'npx',
    [
      'wrangler',
      'r2',
      'object',
      'put',
      `${bucket}/${key}`,
      `--file=${filePath}`,
      `--content-type=${contentType}`,
      '--remote'
    ],
    { stdio: 'inherit' }
  )
}

async function main() {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    printHelp()
    return
  }

  const args = parseArgs(process.argv)
  const versionPrefix = normalizeVersion(args.version)
  const version = versionPrefix.slice(1)
  const uploadsRoot = await resolveUploadsRoot(args['uploads-root'])
  const sourceDir = path.resolve(uploadsRoot, versionPrefix)
  const baseUrl = (args['base-url'] || process.env.PUBLIC_DOWNLOADS_BASE_URL || 'https://downloads.inquiraai.com').replace(
    /\/+$/,
    ''
  )
  const bucket = args.bucket || process.env.R2_BUCKET || process.env.CLOUDFLARE_R2_BUCKET
  const releaseNotesUrl =
    args['release-notes-url'] ||
    process.env.PUBLIC_RELEASE_NOTES_URL ||
    'https://inquiraai.com/docs/getting-started/distribution'

  if (!bucket) {
    throw new Error('Missing R2 bucket. Set R2_BUCKET or CLOUDFLARE_R2_BUCKET.')
  }

  let entries
  try {
    entries = await readdir(sourceDir, { withFileTypes: true })
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      throw new Error(
        `Release folder not found: ${sourceDir}. Ensure installers exist under ${uploadsRoot}/${versionPrefix} (one .dmg and one .exe).`
      )
    }
    throw error
  }
  const macosName = pickInstaller(entries, '.dmg')
  const windowsName = pickInstaller(entries, '.exe')

  const macosSource = path.join(sourceDir, macosName)
  const windowsSource = path.join(sourceDir, windowsName)
  const macosSha = await sha256(macosSource)
  const windowsSha = await sha256(windowsSource)

  const stageDir = await mkdtemp(path.join(os.tmpdir(), 'public-downloads-'))
  const versionDir = path.join(stageDir, versionPrefix)

  try {
    await mkdir(versionDir, { recursive: true })
    await copyFile(macosSource, path.join(versionDir, macosName))
    await copyFile(windowsSource, path.join(versionDir, windowsName))

    const manifest = {
      schema_version: 1,
      product: 'inquira-go',
      version,
      macos_arm64_url: `${baseUrl}/${versionPrefix}/${macosName}`,
      windows_x64_url: `${baseUrl}/${versionPrefix}/${windowsName}`,
      published_at: new Date().toISOString(),
      release_notes_url: releaseNotesUrl,
      macos_arm64_sha256: macosSha,
      windows_x64_sha256: windowsSha,
      source_repository_url: 'https://github.com/adarsh9780/inquira-go'
    }
    const manifestJson = `${JSON.stringify(manifest, null, 2)}\n`

    // Keep local uploads directory in sync with what gets published.
    await writeFile(path.join(uploadsRoot, 'latest.json'), manifestJson, 'utf8')
    await writeFile(path.join(sourceDir, 'manifest.json'), manifestJson, 'utf8')

    await writeFile(path.join(stageDir, 'latest.json'), manifestJson, 'utf8')
    await writeFile(path.join(versionDir, 'manifest.json'), manifestJson, 'utf8')

    // Publish immutable payloads first and latest.json last. If an upload fails,
    // the public latest pointer continues to reference the previous complete release.
    const filesToUpload = [
      { relativePath: `${versionPrefix}/${macosName}`, contentType: 'application/x-apple-diskimage' },
      { relativePath: `${versionPrefix}/${windowsName}`, contentType: 'application/vnd.microsoft.portable-executable' },
      { relativePath: `${versionPrefix}/manifest.json`, contentType: 'application/json' },
      { relativePath: 'latest.json', contentType: 'application/json' }
    ]

    for (const file of filesToUpload) {
      const absolutePath = path.join(stageDir, file.relativePath)
      console.log(`Uploading ${file.relativePath} to r2://${bucket}/${file.relativePath}`)
      uploadObject(bucket, file.relativePath, absolutePath, file.contentType)
    }

    console.log('Upload complete.')
    console.log(`Version: ${version}`)
    console.log(`Manifest URL: ${baseUrl}/latest.json`)
  } finally {
    await rm(stageDir, { recursive: true, force: true })
  }
}

main().catch(error => {
  console.error(error.message)
  process.exit(1)
})
