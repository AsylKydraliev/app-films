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
  filmId!: string;
  filmsChangeSubscription!: Subscription;
  films: Film[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.filmsChangeSubscription = this.httpService.filmsChange.subscribe((films:Film[]) => {
      this.films = films;
    });
    this.httpService.getData();
  }

  ngOnDestroy(){
    this.filmsChangeSubscription.unsubscribe();
  }
}
