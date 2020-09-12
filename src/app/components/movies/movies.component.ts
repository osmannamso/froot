import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {ReplaySubject} from 'rxjs';
import {debounceTime, take, takeUntil} from 'rxjs/operators';
import {MoviePagination} from '../../shared/interfaces/movie-pagination';
import {FormControl} from '@angular/forms';
import {NO_POSTER} from '../../values/values';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  searchPagination: MoviePagination;
  moviePagination: MoviePagination;
  searchControl: FormControl = new FormControl('');
  destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.movieService.getMovies()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.moviePagination = data;
      });
    this.searchValueChanges();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  searchValueChanges(): void {
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroyed$), debounceTime(200))
      .subscribe((value: string) => {
        if (!value) {
          this.searchPagination = null;
        } else {
          this.movieService.searchMovies(value)
            .pipe(take(1))
            .subscribe((data) => {
              this.searchPagination = data;
            });
        }
      });
  }

  imageError(event): void {
    event.target.src = NO_POSTER;
  }
}
