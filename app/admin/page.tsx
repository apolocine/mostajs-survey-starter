import Link from 'next/link';
import { getRepos } from '@/lib/orm/repositories';
import type { SurveyResponse } from '@/lib/orm/repositories';

export const dynamic = 'force-dynamic';

const METRICS: { key: keyof SurveyResponse; label: string }[] = [
  { key: 'ratingGlobal', label: 'Note globale' },
  { key: 'ratingQuality', label: 'Qualité des produits' },
  { key: 'ratingStaff', label: 'Accueil du personnel' },
  { key: 'ratingValue', label: 'Rapport qualité / prix' },
];

const avg = (rows: SurveyResponse[], key: keyof SurveyResponse) =>
  rows.length ? rows.reduce((s, r) => s + Number(r[key] ?? 0), 0) / rows.length : 0;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  // Optional shared-key gate (set ADMIN_KEY to enable; open by default for the demo).
  const expected = process.env.ADMIN_KEY;
  const { key } = await searchParams;
  if (expected && key !== expected) {
    return (
      <main className="container">
        <Link href="/" className="back">← Accueil</Link>
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Espace gérant</h1>
          <p className="muted">Accès protégé. Ajoutez <code>?key=VOTRE_CLÉ</code> à l&apos;URL.</p>
        </div>
      </main>
    );
  }

  const { responses } = await getRepos();
  const rows = (await responses.findAll({}, { sort: { createdAt: -1 } })) as SurveyResponse[];
  const total = rows.length;
  const comments = rows.filter((r) => (r.comment ?? '').trim().length > 0);

  return (
    <main className="container">
      <Link href="/" className="back">← Accueil</Link>

      <div className="page-head">
        <h1>📊 Résultats de l&apos;enquête</h1>
        <Link href="/survey" className="btn btn-ghost">+ Nouvelle réponse</Link>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="n">{total}</div>
          <div className="l">réponses au total</div>
        </div>
        <div className="stat">
          <div className="n">{total ? avg(rows, 'ratingGlobal').toFixed(1) : '—'}</div>
          <div className="l">note globale moyenne / 5</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>Moyenne par question</h2>
        {total === 0 ? (
          <p className="muted">Aucune réponse pour l&apos;instant.</p>
        ) : (
          <div className="bars">
            {METRICS.map((m) => {
              const a = avg(rows, m.key);
              return (
                <div className="bar-row" key={m.key as string}>
                  <span className="label">{m.label}</span>
                  <span className="bar-track">
                    <span className="bar-fill" style={{ width: `${(a / 5) * 100}%` }} />
                  </span>
                  <span className="val">{a.toFixed(1)} / 5</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>
          Commentaires libres <span className="muted">({comments.length})</span>
        </h2>
        {comments.length === 0 ? (
          <p className="muted">Aucun commentaire pour l&apos;instant.</p>
        ) : (
          <div className="comments">
            {comments.map((r) => (
              <div className="comment" key={r.id}>
                <span className="stars-inline">
                  {'★'.repeat(r.ratingGlobal)}{'☆'.repeat(5 - r.ratingGlobal)}
                </span>
                <p>{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
