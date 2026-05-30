import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <div className="emoji">🥖</div>
        <span className="brandbar">🍞 Boulangerie du Marché</span>
        <h1>
          Enquête satisfaction <br />
          <span className="accent">Boulangerie du Marché</span>
        </h1>
        <p>
          Votre avis compte ! Aidez-nous à améliorer nos produits et notre service
          en répondant à 5 questions rapides (moins d&apos;une minute).
        </p>
        <Link href="/survey" className="btn btn-primary">Commencer →</Link>
        <p className="muted" style={{ fontSize: '.8rem', marginTop: '1.5rem' }}>
          Espace gérant : <Link href="/admin" style={{ color: 'var(--accent-d)', fontWeight: 600 }}>/admin</Link>
        </p>
      </section>
    </main>
  );
}
