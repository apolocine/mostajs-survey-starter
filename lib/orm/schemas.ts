/**
 * Domain model — a generic satisfaction-survey starter you can "rename & go":
 *   SurveyResponse → one filled questionnaire (rename fields to your own questions)
 *
 * Pure TypeScript EntitySchema — no codegen. @author Dr Hamid MADANI <drmdh@msn.com>
 */
import type { EntitySchema } from '@mostajs/orm';

export const SurveyResponseSchema: EntitySchema = {
  name: 'SurveyResponse',
  collection: 'survey_responses',
  fields: {
    // Four 1-to-5 ratings + one free-text comment.
    ratingGlobal: { type: 'number', required: true },   // Note globale
    ratingQuality: { type: 'number', required: true },  // Qualité des produits
    ratingStaff: { type: 'number', required: true },    // Accueil du personnel
    ratingValue: { type: 'number', required: true },    // Rapport qualité/prix
    comment: { type: 'text' },                          // Commentaire libre (optionnel)
  },
  relations: {},
  indexes: [{ fields: ['createdAt'] }],
  timestamps: true,
};

export const ALL_SCHEMAS = [SurveyResponseSchema];
