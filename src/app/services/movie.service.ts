import {Injectable} from '@angular/core';
import {MoviePagination} from '../shared/interfaces/movie-pagination';
import {Observable} from 'rxjs';
import {CustomHttpService} from './custom-http.service';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Movie} from '../shared/interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    private http: CustomHttpService
  ) {}

  getMovies(): Observable<MoviePagination> {
    return this.http.get('movie/top_rated/')
      .pipe(map((mp: MoviePagination) => {
        mp.results.forEach((m) => {
          m.poster_path = `${environment.storageUrl}${m.poster_path}`;
        });

        return mp;
      }));
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get(`movie/${id}`)
      .pipe(map((m: Movie) => {
        m.poster_path = `${environment.storageUrl}${m.poster_path}`;

        return m;
      }));
  }

  getSimilarMovies(id: number): Observable<MoviePagination> {
    return this.http.get(`movie/${id}/similar`)
      .pipe(map((mp: MoviePagination) => {
        mp.results.forEach((m) => {
          m.poster_path = `${environment.storageUrl}${m.poster_path}`;
        });

        return mp;
      }));
  }

  searchMovies(text: string): Observable<MoviePagination> {
    return this.http.get(`search/movie`, {query: text})
      .pipe(map((mp: MoviePagination) => {
        mp.results.forEach((m) => {
          m.poster_path = `${environment.storageUrl}${m.poster_path}`;
        });

        return mp;
      }));
  }
}
