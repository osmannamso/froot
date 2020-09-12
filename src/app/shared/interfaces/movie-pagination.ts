import {Movie} from './movie';

export interface MoviePagination {
  page: number;
  total_results: number;
  total_pages: number;
  results: Array<Movie>;
}
