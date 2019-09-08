import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedLetterService {
  content = new BehaviorSubject<string>("");
  share = this.content.asObservable();
  constructor() { }
  updateLetter(letter: string){
    this.content.next(letter);
  }
 

}