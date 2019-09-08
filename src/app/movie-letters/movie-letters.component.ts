import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { IWord, ILetter } from '../hangamanModels.model';
// import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
// import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-movies-letters',
  templateUrl: './movie-letters.component.html',
  styleUrls: ['./movie-letters.component.scss']
})
export class MovieLettersComponent implements OnInit, AfterViewInit {
  @Output() letterButton: EventEmitter<string> = new EventEmitter<string>();
  @Output() isUserWin: EventEmitter<boolean> = new EventEmitter<boolean>();
  letter:                 string;
  movieName:              string;
  movieNameWS:            string; // string, movie name Without Spaces
  movieNameArr:         string[]; // array, movie name  Without Spaces
  movieNameUpdateArr:     string[]; 
  movieNamePrint:         IWord[];
  lettersIndexes:         Map<string, number[]>;
  
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    
  }

  startToShowMovie(movie: string) {
    this.movieName = movie;
    this.movieNameWS = this.movieName.replace(/\s/g, '');
    console.log(this.movieNameWS);
    this.movieNameArr = this.movieNameWS.toLowerCase().split("");
    this.movieNameUpdateArr = [...this.movieNameArr];
    this.movieNameUpdateArr.fill("");
    this.createLettersIndexesMap();
    this.movieNamePrint = [];
    let wordsArr = this.movieName.split(" ");
    let wordLetters: string[] = []; 
    let word: IWord;
    let iLetters: ILetter[] = [];
    wordsArr.forEach(word => {
      wordLetters = word.split("");
      iLetters = [];
      wordLetters.forEach(letter => {
        iLetters.push({value: letter , chosenRandomly: false, isSelected: false});
      });
      this.movieNamePrint.push({value : word, length: wordLetters.length, letters: iLetters});
    });
    console.log(JSON.stringify(this.movieNamePrint));
    this.addQuartersLetters();
  }

  showLetter(letter: string) {
    this.letter = letter.toLowerCase();
    this.addLettersToScreen();
    let isUserWin = this.checkUserWin();
    if(isUserWin){
      this.isUserWin.emit(isUserWin);
    }
  }

  addQuartersLetters() {
    let sumLength = this.movieNameArr.length;
    let quarterIndexesNum = Math.round(sumLength * 0.25);
    let randomIndex = Math.floor(Math.random() * (sumLength - 1));
    let usedRandomIndexArr = [];
    let letter :string;
    for (let i = 0; i < quarterIndexesNum; i++) {
      while (usedRandomIndexArr.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * sumLength);
      }
      usedRandomIndexArr.push(randomIndex);
      letter = this.addLetterToScreen(randomIndex, true);
      if(this.lettersIndexes.get(letter).length == 0){
        this.letterButton.emit(letter);
      }
    }
  }

  addLettersToScreen(){
    let indexesArr = [...this.lettersIndexes.get(this.letter)];
    indexesArr.forEach(index => {
      this.addLetterToScreen(index, false);
      
    });
  }
  
  addLetterToScreen(index: number, chosenRandomly: boolean) {
    let wordIndex :number = 0;
    let wordLength :number = 0;
    let letterIndex :number = index;
    let letter :string;
    this.movieNameUpdateArr[index] = this.movieNameArr[index];
    while (letterIndex >= (wordLength = this.movieNamePrint[wordIndex].length)) {
      letterIndex -= wordLength;
      wordIndex++;
    }
    letter = this.movieNamePrint[wordIndex].letters[letterIndex].value;
    this.movieNamePrint[wordIndex].letters[letterIndex].isSelected = true;;
    this.movieNamePrint[wordIndex].letters[letterIndex].chosenRandomly = chosenRandomly;;
    this.removeLetterIndexes(letter, index);
    return letter.toLowerCase();
  }
  
  checkUserWin(){
    return JSON.stringify(this.movieNameArr) === JSON.stringify(this.movieNameUpdateArr);
  }

  addLetterIndex(letter: string, index: number) {
    letter = letter.toLowerCase();
    let indexesArr = this.lettersIndexes.get(letter);  ;
    if(!indexesArr){
      indexesArr = [];
    }
    indexesArr.push(index);
    this.lettersIndexes.set(letter, indexesArr);
  }

  removeLetterIndexes(letter: string, index: number) {
    let letterIndexes: number[] = this.lettersIndexes.get(letter.toLowerCase());
    let indexTemp = letterIndexes.findIndex(i => i === index);
    if (indexTemp != -1) {
      letterIndexes.splice(indexTemp, 1);
    }
    this.lettersIndexes.set(letter.toLowerCase(), letterIndexes);
  }

  createLettersIndexesMap() {
    this.lettersIndexes = new Map<string, number[]>();
    this.movieNameArr.forEach((letter, i = 0) => {
      this.addLetterIndex(letter, i);
      i++;
    });
  }

}


// @Output() letterButton: EventEmitter<string> = new EventEmitter<string>();
// @Output() isUserWin: EventEmitter<boolean> = new EventEmitter<boolean>();
// letter:                 string;
// movieName:              string;
// movieNameWS:            string; //string, movie name Without Spaces
// movieNameWSArr:         string[]; //array, movie name  Without Spaces
// movieNameMat:           string[][];
// movieNameMatPrint:      string[][];
// lettersIndexes:         Map<string, number[]>;

// constructor() { }

// ngOnInit() {
// }

// ngAfterViewInit() {
  
// }

// startToShowMovie(movie: string) {
//   this.movieName = movie;
//   this.movieNameWS = this.movieName.replace(/\s/g, '');
  
//   console.log(this.movieNameWS);
//   this.movieNameWSArr = this.movieNameWS.toLowerCase().split("");
  
//   this.createLettersIndexesMap();

//   let wordsArr = this.movieName.split(" ");
//   this.movieNameMat = [];
//   this.movieNameMatPrint = [];
//   wordsArr.forEach(word => {
//     this.movieNameMat.push(word.split(""));
//   });
//   this.movieNameMat.forEach(word => {
//     this.movieNameMatPrint.push([...word]);
//   });
//   this.movieNameMatPrint.forEach(arr => {
//     arr.fill("");
//   });
//   this.addQuartersLetters();
// }

// showLetter(letter: string) {
//   // console.log(letter);
//   this.letter = letter.toLowerCase();
//   // let indexesArr = this.lettersIndexes.get(this.letter);
//   // indexesArr.forEach(index => {
//   //   this.addLetterToScreen(index);
//   // });
//   this.addLettersToScreen();
//   let isUserWin = this.checkUserWin();
//   console.log(isUserWin);
//   if(isUserWin){
//     this.isUserWin.emit(isUserWin);
//   }
// }

// addQuartersLetters() {
//   let sumLength = 0;
//   this.movieNameMatPrint.forEach(movieName => {
//     sumLength += movieName.length;
//   });
//   let quarterIndexesNum = Math.round(sumLength * 0.25);
//   let randomIndex = Math.floor(Math.random() * (sumLength - 1));
//   let usedRandomIndexArr = [];
//   let letter :string;
//   for (let i = 0; i < quarterIndexesNum; i++) {
//     while (usedRandomIndexArr.includes(randomIndex)) {
//       randomIndex = Math.floor(Math.random() * sumLength);
//     }
//     usedRandomIndexArr.push(randomIndex);
//     letter = this.addLetterToScreen(randomIndex);
//     if(this.lettersIndexes.get(letter).length == 0){
//       this.letterButton.emit(letter);
//     }
//   }
// }

// addLettersToScreen(){
//   // console.log("letter ::::", this.letter);
//   let indexesArr = [...this.lettersIndexes.get(this.letter)];
//   // console.log("indexesArr ::::", indexesArr);
//   indexesArr.forEach(index => {
//     this.addLetterToScreen(index);
//   });
// }

// addLetterToScreen(index: number) {
//   let wordIndex :number = 0;
//   let wordLength :number = 0;
//   let letterIndex :number = index;
//   let letter :string;
//   // this.movieNameMatPrint.forEach(word=> {
//   //   wordLength = word.length;
//   //   if(letterIndex >= wordLength){
//   //     letterIndex -= wordLength;
//   //     wordIndex++;
//   //   }
//   // });
//   while (letterIndex >= (wordLength = this.movieNameMatPrint[wordIndex].length)) {
//     letterIndex -= wordLength;
//     wordIndex++;
//   }
//   letter = this.movieNameMatPrint[wordIndex][letterIndex] = this.movieNameMat[wordIndex][letterIndex];
//   this.removeLetterIndexes(letter, index);
//   return letter.toLowerCase();
// }

// checkUserWin(){
//   return JSON.stringify(this.movieNameMat) === JSON.stringify(this.movieNameMatPrint);
// }

// addLetterIndex(letter: string, index: number) {
//   letter = letter.toLowerCase();
//   let indexesArr = this.lettersIndexes.get(letter);  ;
//   if(!indexesArr){
//     indexesArr = [];
//   }
//   indexesArr.push(index);
//   this.lettersIndexes.set(letter, indexesArr);
// }

// removeLetterIndexes(letter: string, index: number) {
//   let letterIndexes: number[] = this.lettersIndexes.get(letter.toLowerCase());
//   let indexTemp = letterIndexes.findIndex(i => i === index);
//   if (indexTemp != -1) {
//     letterIndexes.splice(indexTemp, 1);
//   }
//   this.lettersIndexes.set(letter.toLowerCase(), letterIndexes);
// }

// createLettersIndexesMap() {
//   this.lettersIndexes = new Map<string, number[]>();
//   this.movieNameWSArr.forEach((letter, i = 0) => {
//     this.addLetterIndex(letter, i);
//     i++;
//   });
// }




