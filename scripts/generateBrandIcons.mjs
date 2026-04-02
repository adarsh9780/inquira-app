import { copyFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

const projectRoot = process.cwd()
const brandDir = resolve(projectRoot, 'public/brand')
const sourceSvg = resolve(brandDir, 'inquira-mark.svg')
const tempDir = mkdtempSync(resolve(tmpdir(), 'inquira-brand-'))
const previewPng = resolve(tempDir, `${basename(sourceSvg)}.png`)

function run(command, args) {
  execFileSync(command, args, { stdio: 'inherit' })
}

function resizePng(input, size, output) {
  run('sips', ['-z', String(size), String(size), input, '--out', output])
}

function buildMacIconset(input) {
  const iconsetDir = resolve(brandDir, 'macos.iconset')
  rmSync(iconsetDir, { recursive: true, force: true })
  run('mkdir', ['-p', iconsetDir])

  const targets = [
    ['icon_16x16.png', 16],
    ['icon_16x16@2x.png', 32],
    ['icon_32x32.png', 32],
    ['icon_32x32@2x.png', 64],
    ['icon_128x128.png', 128],
    ['icon_128x128@2x.png', 256],
    ['icon_256x256.png', 256],
    ['icon_256x256@2x.png', 512],
    ['icon_512x512.png', 512],
    ['icon_512x512@2x.png', 1024]
  ]

  for (const [filename, size] of targets) {
    resizePng(input, size, resolve(iconsetDir, filename))
  }

  run('iconutil', ['-c', 'icns', iconsetDir, '-o', resolve(brandDir, 'inquira-mark.icns')])
}

try {
  if (!existsSync(sourceSvg)) {
    throw new Error(`Missing source logo SVG: ${sourceSvg}`)
  }

  run('qlmanage', ['-t', '-s', '1024', '-o', tempDir, sourceSvg])

  const icon1024 = resolve(brandDir, 'icon-1024.png')
  copyFileSync(previewPng, icon1024)

  resizePng(icon1024, 512, resolve(brandDir, 'android-chrome-512x512.png'))
  resizePng(icon1024, 192, resolve(brandDir, 'android-chrome-192x192.png'))
  resizePng(icon1024, 180, resolve(brandDir, 'apple-touch-icon.png'))
  resizePng(icon1024, 32, resolve(brandDir, 'favicon-32x32.png'))
  resizePng(icon1024, 16, resolve(brandDir, 'favicon-16x16.png'))

  buildMacIconset(icon1024)

  console.log(`Generated browser and desktop icon assets in ${brandDir}`)
} finally {
  rmSync(tempDir, { recursive: true, force: true })
}
