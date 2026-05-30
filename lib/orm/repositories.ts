/**
 * Typed repository. @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { BaseRepository } from '@mostajs/orm';
import { getOrm } from './client';
import { SurveyResponseSchema } from './schemas';

export type SurveyResponse = {
  id: string;
  ratingGlobal: number;
  ratingQuality: number;
  ratingStaff: number;
  ratingValue: number;
  comment?: string;
  createdAt: string | Date;
};

export async function getRepos() {
  const dialect = await getOrm();
  return {
    responses: new BaseRepository<SurveyResponse>(SurveyResponseSchema, dialect),
  };
}
