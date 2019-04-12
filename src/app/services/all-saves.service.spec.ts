import { TestBed } from '@angular/core/testing';

import { AllSavesService } from './all-saves.service';

describe('AllSavesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllSavesService = TestBed.get(AllSavesService);
    expect(service).toBeTruthy();
  });
});
