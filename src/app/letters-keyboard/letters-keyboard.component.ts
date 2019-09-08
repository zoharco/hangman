import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-letters-keyboard',
  templateUrl: './letters-keyboard.component.html',
  styleUrls: ['./letters-keyboard.component.scss']
})
export class LettersKeyboardComponent implements OnInit {
  @Output() clickEvent: EventEmitter<string> = new EventEmitter<string>();
  letters: string[];
  usedLetters: string[];
  @Input() disableAll: boolean;
 
  constructor() {
  }

  ngOnInit() {
    this.letters = ['a', 'b', 'c', 'd', 'e', 'f',
      'g', 'h', 'i', 'j', 'k', 'l',
      'm', 'n', 'o', 'p', 'q', 'r',
      's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    this.usedLetters = [];
  }

  sendLetter(letter: string) {
    this.disableButton(letter);
    this.clickEvent.emit(letter);
  }

  disableButton(letter: string) {
    console.log("letter arrived:::::", letter);
    if (!this.usedLetters.includes(letter)) {
      this.usedLetters.push(letter);
    }
  }

  enableButton(letter: string) {
    let index = this.usedLetters.findIndex(letterT => letterT === letter);
    if (index != -1) {
      this.usedLetters = [...this.usedLetters.splice(index, 1)];
      // document.getElementById('btn_'+letter).removeAttribute('disabled');
    }
  }

  disableButtons() {
    this.usedLetters = [...this.letters];
  }

  enableButtons() {
    this.usedLetters = [];
  }
}
