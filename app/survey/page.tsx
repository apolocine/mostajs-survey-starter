import Link from 'next/link';

export const dynamic = 'force-dynamic';

/** A 1..5 segmented rating control (pure radios — works with no client JS). */
function Rating({ name, stars = false }: { name: string; stars?: boolean }) {
  return (
    <div className={stars ? 'rating stars' : 'rating'}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n}>
          <input type="radio" id={`${name}-${n}`} name={name} value={n} required />
          <label htmlFor={`${name}-${n}`}>{stars ? '★' : n}</label>
        </span>
      ))}
    </div>
  );
}

export default async function SurveyPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="container">
      <Link href="/" className="back">← Accueil</Link>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Votre avis 🥐</h1>
        <p className="muted" style={{ marginTop: 0 }}>
          Notez de 1 (pas du tout satisfait) à 5 (très satisfait).
        </p>

        {error && <div className="error">Merci de répondre aux 4 notes avant d&apos;envoyer.</div>}

        <form action="/api/responses" method="post">
          <div className="q">
            <label className="q-title">1 · Note globale <span className="hint">(1 à 5 étoiles)</span></label>
            <Rating name="ratingGlobal" stars />
          </div>

          <div className="q">
            <label className="q-title">2 · Qualité des produits</label>
            <Rating name="ratingQuality" />
          </div>

          <div className="q">
            <label className="q-title">3 · Accueil du personnel</label>
            <Rating name="ratingStaff" />
          </div>

          <div className="q">
            <label className="q-title">4 · Rapport qualité / prix</label>
            <Rating name="ratingValue" />
          </div>

          <div className="q">
            <label className="q-title" htmlFor="comment">
              5 · Commentaire libre <span className="hint">(optionnel)</span>
            </label>
            <textarea
              className="input"
              id="comment"
              name="comment"
              placeholder="Dites-nous ce que vous avez aimé ou ce qu'on pourrait améliorer…"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
            Envoyer mon avis
          </button>
        </form>
      </div>
    </main>
  );
}
