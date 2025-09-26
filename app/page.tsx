"use client";
import './globals.css';
import Header from './Header';
import { useEffect, useState } from 'react';

type Photo = { src: string; alt: string; caption: string };
type Category = { id: string; title: string; hero: string; photos: Photo[] };

function getCategoryTitle(folder: string): string {
  const titles: Record<string, string> = {
    'Poze-Bias': 'BIAS 2025',
    'Poze-Motorsport': 'Motorsport',
    'Poze-Parties': 'Parties & Events',
    'Poze-Portrete': 'Portrait',
    'Poze-Street': 'Street Photography',
  };
  return titles[folder] || folder.replace('Poze-', '').replace(/-/g, ' ');
}

function getCategoryId(folder: string): string {
  return folder.replace('Poze-', '').toLowerCase();
}

function getHero(folder: string, files: string[]): string {
  const heroFile = files.find((f) => f.startsWith('1')) || files[0];
  return heroFile ? `${folder}/${heroFile}` : '';
}

function getPhotos(folder: string, files: string[]): Photo[] {
  return files.map((file) => {
    let name = file.replace(/\.[^/.]+$/, '');
    name = name.replace(/^\d+_?/, '');
    return { src: `${folder}/${file}`, alt: name, caption: name };
  });
}

import Link from 'next/link';

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [heroByFolder, setHeroByFolder] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/scan');
        if (!res.ok) throw new Error('Failed');
        const folderData: Record<string, string[]> = await res.json();
        const cats: Category[] = Object.entries(folderData).map(([folder, files]) => ({
          id: getCategoryId(folder),
          title: getCategoryTitle(folder),
          hero: getHero(`/${folder}`, files),
          photos: getPhotos(`/${folder}`, files),
        }));
        setCategories(cats);
        const map: Record<string, string> = {};
        for (const [folder, files] of Object.entries(folderData)) {
          map[folder] = getHero(`/${folder}`, files);
        }
        setHeroByFolder(map);
      } catch (e) {
        setError('Could not load gallery data.');
      }
    }
    load();
  }, []);

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-6">
        <section className="py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-light tracking-tight text-balance mb-6">Răzvan–Tudor Lungu</h1>
            <p className="text-xl text-muted-foreground mb-4 font-light">A.K.A. <span className="text-foreground font-medium">DODO</span></p>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-2xl mb-16">Capturing every moment through my lens. Each shot isn't just a picture, but a new experience — a play of light, shadow, and emotion.</p>
          </div>

          {(() => {
            // Easy-to-edit placeholders: change any of these strings to control the hero layout
            const hero = (folder: string, custom: string = '') => {
              const customPath = custom ? (custom.startsWith('/') ? custom : `/${custom}`) : '';
              return customPath || heroByFolder[folder] || '';
            };
            const top: string[] = [
              hero('Poze-Street', 'Poze-Parties/1Party.jpg'),
              hero('Poze-Portrete', 'Poze-Bias/_MG_9043.jpg'),
              hero('Poze-Bias', 'Poze-Parties/2Olimpiada - InfoEducatie.jpg'),
            ];
            const middle: string = hero('Poze-Parties', 'Poze-Bias/_MG_0163.jpg');
            const bottom: string[] = [
              hero('Poze-Motorsport', 'Poze-Parties/Olimpiada - InfoEducatie.jpg'),
              hero('Poze-Street', 'Poze-Portrete/1Caragiale-MUN.jpg'),
              hero('Poze-Portrete', 'Poze-Portrete/2Caragiale-MUN.jpg'),
            ];

            return (
              <>
                {/* Top: 3 vertical images */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                  {top.map((src, idx) => (
                    <div key={`top-${idx}`} className="aspect-[4/5] bg-muted rounded-sm overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {src ? (
                        <img src={src} alt="hero" className="w-full h-full object-cover object-center" />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Middle: 1 full-width landscape */}
                <div className="w-full aspect-[16/9] bg-muted rounded-sm overflow-hidden mb-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {middle ? (
                    <img src={middle} alt="hero-wide" className="w-full h-full object-cover object-center" />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                </div>

                {/* Bottom: 3 vertical images */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
                  {bottom.map((src, idx) => (
                    <div key={`bottom-${idx}`} className="aspect-[4/5] bg-muted rounded-sm overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {src ? (
                        <img src={src} alt="hero" className="w-full h-full object-cover object-center" />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                    </div>
                  ))}
                </div>
              </>
            );
          })()}

          {error && <p className="text-red-400">{error}</p>}

          {/* CTA removed as requested */}
        </section>
      </main>
      <footer className="border-t border-border/20 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">© 2025 Răzvan–Tudor Lungu</p>
            <div className="flex items-center gap-6">
              <Link href="http://instagram.com/photosby_dodo" className="text-muted-foreground hover:text-foreground transition-colors">Instagram</Link>
              </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

