"use client";
import '../globals.css';
import Header from '../Header';

export default function ContactPage() {
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-6">
        <section className="py-14">
          <div className="brand" style={{textAlign:'center'}}>
            <h1>Răzvan–Tudor Lungu</h1>
            <p className="lead">Let's create something beautiful together</p>
          </div>
          <div style={{ maxWidth: 520, margin:'0 auto', background: 'linear-gradient(180deg, rgba(255,255,255,.03), rgba(0,0,0,.02))', border: '1px solid rgba(255,255,255,.06)', borderRadius: 12, padding: 20, boxShadow: '0 12px 40px rgba(0,0,0,.35)' }}>
            <h3>Get In Touch</h3>
            <div style={{ height: 10 }} />
            <p><strong>Email</strong><br/>lungurazvantudor@gmail.com</p>
            <p><strong>Phone</strong><br/>+40 736 195 520</p>
            <p><strong>Location</strong><br/>Bucharest, Romania</p>
          </div>
        </section>
      </main>
    </div>
  );
}


