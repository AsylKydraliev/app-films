import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit{
  loading = false;
  name = '';

  constructor(private httpService: HttpService) {}

  ngOnInit(){
    this.httpService.filmsFetching.subscribe((isFetching: boolean) => {
      this.loading = isFetching;
    });
  }

  addFilm() {
    const name = this.name;
    this.httpService.postData(name);
  }
}
