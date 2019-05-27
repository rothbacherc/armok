import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBloodlineComponent } from './public-bloodline.component';

describe('PublicBloodlineComponent', () => {
  let component: PublicBloodlineComponent;
  let fixture: ComponentFixture<PublicBloodlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicBloodlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicBloodlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
