import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MovieLettersComponent } from './movie-letters/movie-letters.component';
import { HangmanViewHandlerComponent } from './hangman-view-handler/hangman-view-handler.component';
import { HttpClient } from '@angular/common/http'

import { IMovie } from './hangamanModels.model';
import { MoviesFBService } from '../services/movies-fb.service';
import { LettersKeyboardComponent } from './letters-keyboard/letters-keyboard.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MovieLettersComponent, { static: true }) movieLetters: MovieLettersComponent;
  @ViewChild(HangmanViewHandlerComponent, { static: true }) hangmanViewHandler: HangmanViewHandlerComponent;
  @ViewChild(LettersKeyboardComponent, { static: true }) lettersKeyboard: LettersKeyboardComponent;

  title: string = 'hangman';
  letter: string;
  countMistakes: number;
  currentMovie: IMovie;
  isGameover:boolean;
  userWin:boolean;
  // movieNameArr: string[];
  movies: IMovie[];
  constructor(private http: HttpClient, private moviesFBService: MoviesFBService) {
  }

  ngOnInit() {
    this.moviesFBService.fetchMovieList().subscribe(res => {
      this.movies = res;
      this.startGame();
    });
  }

  ngAfterViewInit() {
  }

  startGame(){
    this.countMistakes = 0;
    this.isGameover = false;
    
    // this.hangmanViewHandler.showNextHangman(this.countMistakes);
    this.lettersKeyboard.enableButtons();
    this.currentMovie = this.randomMovie();
    this.movieLetters.startToShowMovie(this.currentMovie.title);
    
    
  }

  sendLetterToKeyBoard($event:any){
    this.lettersKeyboard.disableButton($event);
  }

  randomMovie() {
    const index = Math.round(Math.random() * this.movies.length);
    return this.movies[index]; 
  }

  gameover(userWin:boolean){
    this.isGameover = true;
    this.lettersKeyboard.disableButtons();
    this.userWin = userWin;
  }

  handleLetter($event:any) {
    this.letter = $event;
    this.currentMovie.title = this.currentMovie.title.toLowerCase();
    if (this.currentMovie.title.includes(this.letter)) {
      this.movieLetters.showLetter(this.letter);
    }
    else {//the letter does not exist in the movie name
      this.countMistakes++;
      // if (this.countMistakes < 6) {
      //   this.hangmanViewHandler.showNextHangman(this.countMistakes);
      // }
      //else
      if (this.countMistakes > 5){
        this.gameover(false);
      }
    }
  }
}
