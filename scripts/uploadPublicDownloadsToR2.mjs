import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { mkdtemp, mkdir, readdir, rm, copyFile, writeFile } from 'node:fs/promises'
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

function normalizeVersion(version) {
  const trimmed = String(version || '').trim()
  if (!trimmed) throw new Error('Missing required --version value')
  return trimmed.startsWith('v') ? trimmed : `v${trimmed}`
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
  const args = parseArgs(process.argv)
  const versionPrefix = normalizeVersion(args.version)
  const version = versionPrefix.slice(1)
  const uploadsRoot = args['uploads-root'] || path.join(os.homedir(), 'Downloads', 'inquira-uploads')
  const sourceDir = path.resolve(uploadsRoot, versionPrefix)
  const baseUrl = (args['base-url'] || process.env.PUBLIC_DOWNLOADS_BASE_URL || 'https://downloads.inquiraai.com').replace(
    /\/+$/,
    ''
  )
  const bucket = args.bucket || process.env.R2_BUCKET || process.env.CLOUDFLARE_R2_BUCKET
  const releaseNotesUrl =
    args['release-notes-url'] || process.env.PUBLIC_RELEASE_NOTES_URL || `https://github.com/adarsh9780/inquira-ee/releases/tag/${versionPrefix}`

  if (!bucket) {
    throw new Error('Missing R2 bucket. Set R2_BUCKET or CLOUDFLARE_R2_BUCKET.')
  }

  const entries = await readdir(sourceDir, { withFileTypes: true })
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
      version,
      macos_arm64_url: `${baseUrl}/${versionPrefix}/${macosName}`,
      windows_x64_url: `${baseUrl}/${versionPrefix}/${windowsName}`,
      published_at: new Date().toISOString(),
      release_notes_url: releaseNotesUrl,
      macos_arm64_sha256: macosSha,
      windows_x64_sha256: windowsSha
    }
    const manifestJson = `${JSON.stringify(manifest, null, 2)}\n`
    await writeFile(path.join(stageDir, 'latest.json'), manifestJson, 'utf8')
    await writeFile(path.join(versionDir, 'manifest.json'), manifestJson, 'utf8')

    const filesToUpload = [
      { relativePath: 'latest.json', contentType: 'application/json' },
      { relativePath: `${versionPrefix}/manifest.json`, contentType: 'application/json' },
      { relativePath: `${versionPrefix}/${macosName}`, contentType: 'application/octet-stream' },
      { relativePath: `${versionPrefix}/${windowsName}`, contentType: 'application/octet-stream' }
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
