import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCollectionComponent } from './save-collection.component';

describe('SaveCollectionComponent', () => {
  let component: SaveCollectionComponent;
  let fixture: ComponentFixture<SaveCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
