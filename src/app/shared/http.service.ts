import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from './film.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()

export class HttpService {
  filmsChange = new Subject<Film[]>();
  filmsFetching = new Subject<boolean>();
  private films: Film[] = [];
  film!: Film;

  constructor(private http: HttpClient) {}

  postData(film: string){
    this.filmsFetching.next(true);
    const body = {film};
    this.http.post<Film>('https://app-blog-f76a2-default-rtdb.firebaseio.com/films.json', body).subscribe();
    this.getData();
    this.getData();
    this.filmsFetching.next(false);
  }

  getData(){
    this.filmsFetching.next(true);
    this.http.get<{[id: string]: Film}>('https://app-blog-f76a2-default-rtdb.firebaseio.com/films.json')
      .pipe(map(result => {
        return Object.keys(result).map(id => {
          const filmsData = result[id]
          return new Film(id, filmsData.film);
        });
      }))
      .subscribe(films => {
        this.films = films;
        this.filmsChange.next(this.films.slice());
        this.filmsFetching.next(false);
      }, () => {
        this.filmsFetching.next(false);
      });
  }

  delete(id: string){
    this.filmsFetching.next(true);
    this.http.delete(`https://app-blog-f76a2-default-rtdb.firebaseio.com/films/${id}.json`)
      .subscribe();
    this.getData();
    this.getData();
    this.filmsFetching.next(false);
  }
}
