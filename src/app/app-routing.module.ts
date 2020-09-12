import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MoviesComponent} from './components/movies/movies.component';
import {MovieComponent} from './components/movie/movie.component';

// Все сделал в app module так как приложение маленькое
const routes: Routes = [
  {path: '', redirectTo: 'movies', pathMatch: 'full'},
  {path: 'movies', component: MoviesComponent},
  {path: 'movies/:id', component: MovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
