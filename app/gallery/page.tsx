"use client";
import '../globals.css';
import Header from '../Header';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
  if (!files || files.length === 0) return '';
  const sorted = [...files].sort((a, b) => {
    const aPref = a.startsWith('1') ? 0 : 1;
    const bPref = b.startsWith('1') ? 0 : 1;
    if (aPref !== bPref) return aPref - bPref;
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });
  const heroFile = sorted[0];
  return heroFile ? `/${folder}/${heroFile}` : '';
}

function getPhotos(folder: string, files: string[]): Photo[] {
  return files.map((file) => {
    let name = file.replace(/\.[^/.]+$/, '');
    name = name.replace(/^\d+_?/, '');
    return { src: `/${folder}/${file}`, alt: name, caption: name };
  });
}

export default function GalleryPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/scan');
        if (!res.ok) throw new Error('Failed to fetch');
        const folderData: Record<string, string[]> = await res.json();
        const cats: Category[] = Object.entries(folderData).map(([folder, files]) => ({
          id: getCategoryId(folder),
          title: getCategoryTitle(folder),
          hero: getHero(folder, files),
          photos: getPhotos(folder, files),
        }));
        setCategories(cats);
      } catch (e) {
        setError('Could not load gallery data.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightboxIndex !== null && currentCategory) {
        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowRight') setLightboxIndex((lightboxIndex + 1) % currentCategory.photos.length);
        if (e.key === 'ArrowLeft') setLightboxIndex((lightboxIndex - 1 + currentCategory.photos.length) % currentCategory.photos.length);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, currentCategory]);

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-6">
        <section className="py-14">
          <div className="mb-10">
            <h1 className="text-4xl font-light tracking-tight">Gallery</h1>
            <p className="text-muted-foreground">Browse by category. Click a category to open photos, click a photo to open lightbox.</p>
          </div>
        {loading && (
          <div className="loading">
            <div className="loading-spinner" />
            <p>Loading gallery...</p>
          </div>
        )}
        {error && (
          <div className="error">
            <h3>Gallery Configuration</h3>
            <p>{error}</p>
          </div>
        )}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat) => (
                <div key={cat.id} className="group" onClick={() => setCurrentCategory(cat)}>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">{cat.title}</h3>
                  <div className="aspect-[4/5] bg-muted rounded-sm overflow-hidden mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cat.hero} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">{cat.photos.length} photos</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Category Modal */}
      <div className={`modal ${currentCategory ? 'open' : ''}`} onClick={(e) => e.currentTarget === e.target && setCurrentCategory(null)}>
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{currentCategory?.title ?? 'Category'}</h2>
            <button className="close-btn" onClick={() => setCurrentCategory(null)}>&times;</button>
          </div>
          <div className="modal-gallery">
            {currentCategory?.photos.map((p, i) => (
              <div key={p.src} className="modal-item" onClick={() => setLightboxIndex(i)}>
                <div className="modal-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} loading="lazy" onError={(e) => ((e.currentTarget.style.opacity = '0.5'))} />
                </div>
                <div className="modal-caption">{p.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <div className={`lightbox ${lightboxIndex !== null ? 'open' : ''}`} onClick={(e) => e.currentTarget === e.target && setLightboxIndex(null)}>
        <div className="lb-inner">
          {currentCategory && lightboxIndex !== null && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img id="lb-img" className="lb-img" src={currentCategory.photos[lightboxIndex].src} alt={currentCategory.photos[lightboxIndex].alt} />
              <div className="lb-meta">
                <div id="lb-caption">{currentCategory.photos[lightboxIndex].caption}</div>
                <div className="lb-controls">
                  <button className="btn" onClick={() => setLightboxIndex((lightboxIndex - 1 + currentCategory.photos.length) % currentCategory.photos.length)}>Prev</button>
                  <button className="btn" onClick={() => setLightboxIndex((lightboxIndex + 1) % currentCategory.photos.length)}>Next</button>
                  <button className="btn" onClick={() => setLightboxIndex(null)}>Close</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


