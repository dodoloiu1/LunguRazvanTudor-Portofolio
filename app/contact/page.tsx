"use client";
import '../globals.css';
import Header from '../Header';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-6">
        <section className="py-20">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-5xl font-light tracking-tight text-balance mb-6">Get In Touch</h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">Let's create something beautiful together. I'm always excited to collaborate on new projects and capture meaningful moments.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border/20 rounded-lg p-8 shadow-lg">
              <div className="space-y-8">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 rounded-full opacity-0" />
                  <div className="text-center">
                    <h2 className="text-2xl font-light mb-2">Răzvan–Tudor Lungu</h2>
                    <p className="text-muted-foreground">Photographer & Visual Storyteller</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href="mailto:lungurazvantudor@gmail.com" className="text-foreground hover:text-muted-foreground transition-colors">
                        lungurazvantudor@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href="tel:+40736195520" className="text-foreground hover:text-muted-foreground transition-colors">
                        +40 736 195 520
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-foreground">Bucharest, Romania</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/20">
                  <div className="flex items-center justify-center space-x-6">
                    <Link 
                      href="http://instagram.com/photosby_dodo" 
                      className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                      </svg>
                      <span>Instagram</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border/20">
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


