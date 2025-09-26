"use client";
import '../globals.css';
import Header from '../Header';

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-6">
        <section className="py-14 max-w-3xl">
          <h1 className="text-4xl font-light tracking-tight mb-6">About</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Short bio and philosophy about photography.</p>
        </section>
      </main>
    </div>
  );
}


