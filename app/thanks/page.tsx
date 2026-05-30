import Link from 'next/link';

export default function ThanksPage() {
  return (
    <main className="container">
      <section className="thanks">
        <div className="check">🎉</div>
        <h1>Merci pour votre avis !</h1>
        <p className="muted">
          Votre réponse a bien été enregistrée. Elle nous aide à faire mieux chaque jour. 🥖
        </p>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-ghost">Retour à l&apos;accueil</Link>
          <Link href="/survey" className="btn btn-primary">Répondre à nouveau</Link>
        </div>
      </section>
    </main>
  );
}
