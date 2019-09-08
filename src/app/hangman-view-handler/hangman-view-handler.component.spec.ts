import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HangmanViewHandlerComponent } from './hangman-view-handler.component';

describe('HangmanViewHandlerComponent', () => {
  let component: HangmanViewHandlerComponent;
  let fixture: ComponentFixture<HangmanViewHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangmanViewHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HangmanViewHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
