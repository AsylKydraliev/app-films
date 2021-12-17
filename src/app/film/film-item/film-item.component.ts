import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../shared/film.model';
import { HttpService } from '../../shared/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit{
  @Input() film!: Film;
  filmId!: string;
  filmsFetchingSubscription!: Subscription;
  loading = false;

  constructor(private httpService: HttpService) {}

  ngOnInit(){
    if(this.film){
      this.filmId = this.film.id;
    }
    this.httpService.filmsChange.subscribe();
  }

  onDelete(id: string){
    this.httpService.delete(id);
    this.filmsFetchingSubscription = this.httpService.filmsFetching.subscribe((isFetching: boolean) => {
      this.loading = isFetching;
    })
  }
}
