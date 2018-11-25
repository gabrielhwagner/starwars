import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBlockDetailComponent } from './movie-block-detail.component';

describe('MovieBlockDetailComponent', () => {
  let component: MovieBlockDetailComponent;
  let fixture: ComponentFixture<MovieBlockDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieBlockDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieBlockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
