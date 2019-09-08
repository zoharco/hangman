import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MovieLettersComponent } from './movie-letters/movie-letters.component';
import { LettersKeyboardComponent } from './letters-keyboard/letters-keyboard.component';
import { HangmanViewHandlerComponent } from './hangman-view-handler/hangman-view-handler.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesFBService } from '../services/movies-fb.service';
import { SharedLetterService } from "../services/shared-letter.service";

@NgModule({
  declarations: [
    AppComponent,
    MovieLettersComponent,
    LettersKeyboardComponent,
    HangmanViewHandlerComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [MoviesFBService, SharedLetterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
