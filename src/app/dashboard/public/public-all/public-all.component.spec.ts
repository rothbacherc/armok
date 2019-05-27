import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAllComponent } from './public-all.component';

describe('PublicAllComponent', () => {
  let component: PublicAllComponent;
  let fixture: ComponentFixture<PublicAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
