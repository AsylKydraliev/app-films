import { Component } from '@angular/core';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent {
  name = '';

  constructor(private httpService: HttpService) {}

  addFilm() {
    const name = this.name;
    this.httpService.postData(name);
  }
}
