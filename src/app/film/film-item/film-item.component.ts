import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../shared/film.model';
import { HttpService } from '../../shared/http.service';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit{
  @Input() film!: Film;
  filmId!: string;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(){
    if(this.film){
      this.filmId = this.film.id;
    }
  }

  onDelete(id: string){
    console.log(id)
    this.httpService.delete(id);
  }
}
