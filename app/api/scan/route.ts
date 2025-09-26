import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const entries = await fs.readdir(publicDir, { withFileTypes: true });
    const pozeDirs = entries.filter((e) => e.isDirectory() && e.name.startsWith('Poze-')).map((e) => e.name);

    const result: Record<string, string[]> = {};
    for (const dir of pozeDirs) {
      const full = path.join(publicDir, dir);
      const files = await fs.readdir(full);
      const images = files.filter((f) => /\.(jpe?g|png|gif|webp)$/i.test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
      if (images.length > 0) {
        result[dir] = images;
      }
    }
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: 'scan_failed' }, { status: 500 });
  }
}

