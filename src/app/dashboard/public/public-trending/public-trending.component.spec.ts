import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTrendingComponent } from './public-trending.component';

describe('PublicTrendingComponent', () => {
  let component: PublicTrendingComponent;
  let fixture: ComponentFixture<PublicTrendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicTrendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
