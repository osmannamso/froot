import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/movie.service';
import {take, takeUntil} from 'rxjs/operators';
import {Movie} from '../../shared/interfaces/movie';
import {MoviePagination} from '../../shared/interfaces/movie-pagination';
import {NO_POSTER} from '../../values/values';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  similarMoviePagination: MoviePagination;
  movie: Movie;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroyed$))
      .subscribe((params) => {
        this.movieService.getMovie(params.id)
          .pipe(take(1))
          .subscribe((data) => {
            this.movie = data;
          });
        this.movieService.getSimilarMovies(params.id)
          .pipe(take(1))
          .subscribe((data) => {
            this.similarMoviePagination = data;
          });
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  imageError(event): void {
    event.target.src = NO_POSTER;
  }
}
