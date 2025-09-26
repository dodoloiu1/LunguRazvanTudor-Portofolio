/* eslint-disable no-console */
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

async function ensureDir(p) {
  await fsp.mkdir(p, { recursive: true });
}

async function copyDir(src, dest) {
  await ensureDir(dest);
  const entries = await fsp.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) {
      await copyDir(s, d);
    } else {
      await fsp.copyFile(s, d);
    }
  }
}

async function mirrorDelete(dest, src) {
  // Remove any files/dirs in dest that don't exist in src
  if (!fs.existsSync(dest)) return;
  const entries = await fsp.readdir(dest, { withFileTypes: true });
  for (const e of entries) {
    const dPath = path.join(dest, e.name);
    const sPath = path.join(src, e.name);
    const exists = await fsp
      .access(sPath)
      .then(() => true)
      .catch(() => false);
    if (!exists) {
      if (e.isDirectory()) {
        await fsp.rm(dPath, { recursive: true, force: true });
      } else {
        await fsp.unlink(dPath);
      }
    } else if (e.isDirectory()) {
      await mirrorDelete(dPath, sPath);
    }
  }
}

async function main() {
  const nextRoot = path.resolve(__dirname, '..');
  const publicDir = path.join(nextRoot, 'public');

  await ensureDir(publicDir);

  // Get Poze-* directories from the next-gallery directory
  const entries = await fsp.readdir(nextRoot, { withFileTypes: true });
  const pozeDirs = entries.filter((e) => e.isDirectory() && e.name.startsWith('Poze-')).map((e) => e.name);

  for (const dir of pozeDirs) {
    const src = path.join(nextRoot, dir);
    const dest = path.join(publicDir, dir);
    await mirrorDelete(dest, src);
    await copyDir(src, dest);
    console.log(`Synced ${dir}`);
  }
  // Also delete Poze-* folders in public that no longer exist at source
  const publicEntries = (await fsp.readdir(publicDir, { withFileTypes: true })).filter((e) => e.isDirectory() && e.name.startsWith('Poze-')).map((e) => e.name);
  for (const d of publicEntries) {
    if (!pozeDirs.includes(d)) {
      await fsp.rm(path.join(publicDir, d), { recursive: true, force: true });
      console.log(`Removed stale folder ${d}`);
    }
  }
  console.log('Sync complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


