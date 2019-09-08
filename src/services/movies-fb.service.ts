import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IMovie } from '../app/hangamanModels.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MoviesFBService {

  constructor(private http: HttpClient) { }

  fetchMovieList():Observable<IMovie[]>{
    return this.http.get<IMovie[]>('https://hangman-game-92268.firebaseio.com/.json')
  }

}