import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from './film.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()

export class HttpService {
  filmsChange = new Subject<Film[]>();
  films: Film[] = [];
  constructor(private http: HttpClient) {}

  postData(film: string){
    const body = {film};
    return this.http.post<Film>('https://app-blog-f76a2-default-rtdb.firebaseio.com/films.json', body).subscribe();
  }

  getData(){
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
      });
  }

  getFilms(){
    return this.films.slice();
  }

  delete(id: string){
    this.http.delete(`https://app-blog-f76a2-default-rtdb.firebaseio.com/films${id}.json`).subscribe();
  }
}
