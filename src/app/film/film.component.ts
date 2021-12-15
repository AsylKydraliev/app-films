import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Film } from '../shared/film.model';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit, OnDestroy {
  filmId!: string;
  filmsChangeSubscription!: Subscription;
  films: Film[] = [];
  film!: Film;

  constructor(private filmService: HttpService, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.films = this.filmService.getFilms();
    this.filmsChangeSubscription = this.filmService.filmsChange.subscribe((films:Film[]) => {
      this.films = films;
    });
    this.filmService.getData();

    this.route.params.subscribe((params: Params) => {
      if (params['id']){this.filmId  = params['id'];
        this.http.get<Film>(`https://app-blog-f76a2-default-rtdb.firebaseio.com/films${this.filmId}.json`)
          .subscribe(result => {
            this.film = result;
          });
      }
    });
  }

  ngOnDestroy(){
    this.filmsChangeSubscription.unsubscribe();
  }

  deleteFilm(id: string){
    this.filmService.delete(id);
  }
}
