import { TestBed } from '@angular/core/testing';

import { BloodSaveService } from './blood-save.service';

describe('BloodSaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodSaveService = TestBed.get(BloodSaveService);
    expect(service).toBeTruthy();
  });
});
