import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Film } from '../shared/film.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit, OnDestroy {
  films!: Film[];
  filmsChangeSubscription!: Subscription;
  filmsFetchingSubscription!: Subscription;
  loading = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.filmsChangeSubscription = this.httpService.filmsChange.subscribe((films:Film[]) => {
      this.films = films;
      console.log(this.films)
    });
    this.filmsFetchingSubscription = this.httpService.filmsFetching.subscribe((isFetching:boolean) => {
      this.loading = isFetching;
    });
    this.httpService.getData();
  }

  ngOnDestroy(){
    this.filmsChangeSubscription.unsubscribe();
    this.filmsFetchingSubscription.unsubscribe();
  }
}
