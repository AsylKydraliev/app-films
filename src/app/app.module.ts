import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { FilmComponent } from './film/film.component';
import { FormsModule } from '@angular/forms';
import { HttpService } from './shared/http.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FilmItemComponent } from './film/film-item/film-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AddFilmComponent,
    FilmComponent,
    FilmItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
