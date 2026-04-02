import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const { decompressSQLDump } = await import(
  new URL('../node_modules/@nuxt/content/dist/runtime/internal/dump.js', import.meta.url)
)

async function buildSeedSql() {
  const publicDir = resolve(process.cwd(), '.output/public')
  const outputFile = resolve(process.cwd(), '.output/content-seed.sql')
  const dumpFiles = readdirSync(publicDir)
    .filter((entry) => /^dump\..+\.sql$/.test(entry))
    .sort()

  if (dumpFiles.length === 0) {
    throw new Error(`No Nuxt Content dump files found in ${publicDir}`)
  }

  const sqlSections = []

  for (const dumpFile of dumpFiles) {
    const compressedDump = readFileSync(resolve(publicDir, dumpFile), 'utf8')
    const statements = await decompressSQLDump(compressedDump)
    if (statements.length === 0) {
      throw new Error(`Nuxt Content dump ${dumpFile} did not produce any SQL statements`)
    }

    sqlSections.push(`-- ${dumpFile}`, ...statements, '')
  }

  writeFileSync(outputFile, `${sqlSections.join('\n')}\n`, 'utf8')
  console.log(`Generated ${outputFile} from ${dumpFiles.length} content dump(s)`)
}

await buildSeedSql()
