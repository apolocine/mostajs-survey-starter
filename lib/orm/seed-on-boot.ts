/**
 * Idempotent demo seed — 10 pre-filled responses so the admin dashboard is
 * never empty on first boot. Disable with ORM_SEED_ON_BOOT=0.
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { BaseRepository, type IDialect } from '@mostajs/orm';
import { SurveyResponseSchema } from './schemas';
import type { SurveyResponse } from './repositories';

type Seed = [number, number, number, number, string?];

// [global, quality, staff, value, comment?]
const FIXTURES: Seed[] = [
  [5, 5, 5, 4, 'Le pain est excellent, toujours frais. Je recommande !'],
  [4, 5, 4, 3, 'Très bons produits mais un peu chers.'],
  [5, 4, 5, 5, 'Accueil chaleureux, je viens tous les matins.'],
  [3, 3, 2, 3, "L'attente est parfois longue le week-end."],
  [4, 4, 4, 4],
  [5, 5, 4, 4, 'La meilleure baguette du quartier.'],
  [2, 3, 2, 2, 'Croissants pas assez cuits ce jour-là.'],
  [4, 4, 5, 4, 'Personnel très souriant.'],
  [5, 5, 5, 5, 'Parfait, rien à redire.'],
  [3, 4, 3, 2, 'Bon mais le rapport qualité/prix pourrait être meilleur.'],
];

export async function seedIfEmpty(dialect: IDialect): Promise<void> {
  if (process.env.ORM_SEED_ON_BOOT === '0') return;

  const responses = new BaseRepository<SurveyResponse>(SurveyResponseSchema, dialect);
  if ((await responses.count({})) > 0) return; // idempotent

  for (const [g, q, s, v, comment] of FIXTURES) {
    await responses.create({
      ratingGlobal: g,
      ratingQuality: q,
      ratingStaff: s,
      ratingValue: v,
      ...(comment ? { comment } : {}),
    });
  }
}
