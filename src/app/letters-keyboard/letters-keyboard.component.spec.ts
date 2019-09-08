import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersKeyboardComponent } from './letters-keyboard.component';

describe('LettersKeyboardComponent', () => {
  let component: LettersKeyboardComponent;
  let fixture: ComponentFixture<LettersKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettersKeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettersKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
