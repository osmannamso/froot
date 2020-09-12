import {ProductionCompany} from './production-company';

export interface Movie {
  id: number;
  vote_count: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  production_companies: Array<ProductionCompany>;
}
