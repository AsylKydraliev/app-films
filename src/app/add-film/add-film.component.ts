import { Component } from '@angular/core';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent {
  name = '';

  constructor(private filmService: HttpService) {}

  addFilm() {
    const name = this.name;
    this.filmService.postData(name);
  }
}
