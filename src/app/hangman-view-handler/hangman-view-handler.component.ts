import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hangman-view-handler',
  templateUrl: './hangman-view-handler.component.html',
  styleUrls: ['./hangman-view-handler.component.scss']
})
export class HangmanViewHandlerComponent implements OnInit {

  @Input() imgIndex : string;
  constructor() { }

  ngOnInit() {
  }

  // showNextHangman(index:number){
  //   if(index < 0 || index > 6){
  //     return;
  //   }
  //   this.imgSrc = this.imgSrc.replace((index == 0? 6 : index - 1).toString(), index.toString());
  //   // console.log('showNextHangman',index);
  // }
}
