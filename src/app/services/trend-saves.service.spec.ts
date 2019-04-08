import { TestBed } from '@angular/core/testing';

import { TrendSavesService } from './trend-saves.service';

describe('TrendSavesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrendSavesService = TestBed.get(TrendSavesService);
    expect(service).toBeTruthy();
  });
});
