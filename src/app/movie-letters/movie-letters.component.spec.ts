import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieLettersComponent } from './movie-letters.component';

describe('MovieLettersComponent', () => {
  let component: MovieLettersComponent;
  let fixture: ComponentFixture<MovieLettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieLettersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
