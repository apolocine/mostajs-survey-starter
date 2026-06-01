/**
 * POST /api/responses — store one survey submission, then redirect to /thanks.
 *
 * A Route Handler (not a Server Action) on purpose: a plain `<form action=...>`
 * posts here with no client JS, and this pattern boots reliably in WebContainers
 * (Bolt.new / StackBlitz). The form needs no cookies, so it's a clean insert + 303.
 *
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { type NextRequest, NextResponse } from 'next/server';
import { getRepos } from '@/lib/orm/repositories';

/** Read a 1..5 rating from the form, or null if missing/out of range. */
function rating(form: FormData, key: string): number | null {
  const n = Number(form.get(key));
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : null;
}

/**
 * 303 avec un `Location` RELATIF. Le navigateur le résout contre l'URL publique
 * de la requête → marche en WebContainer (StackBlitz/Bolt) et derrière un proxy.
 * Une URL absolue (`new URL(path, req.url)`) pointerait sur le bind interne
 * `localhost` car le WebContainer ne transmet pas l'hôte public au serveur.
 */
function see(location: string): NextResponse {
  return new NextResponse(null, { status: 303, headers: { Location: location } });
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const ratingGlobal = rating(form, 'ratingGlobal');
  const ratingQuality = rating(form, 'ratingQuality');
  const ratingStaff = rating(form, 'ratingStaff');
  const ratingValue = rating(form, 'ratingValue');
  const comment = String(form.get('comment') ?? '').trim();

  if (ratingGlobal === null || ratingQuality === null || ratingStaff === null || ratingValue === null) {
    return see('/survey?error=1');
  }

  const { responses } = await getRepos();
  await responses.create({
    ratingGlobal,
    ratingQuality,
    ratingStaff,
    ratingValue,
    ...(comment ? { comment } : {}),
  });

  return see('/thanks');
}
