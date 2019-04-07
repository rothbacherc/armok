import { TestBed } from '@angular/core/testing';

import { MySavesService } from './mysaves.service';

describe('SavesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MySavesService = TestBed.get(MySavesService);
    expect(service).toBeTruthy();
  });
});
