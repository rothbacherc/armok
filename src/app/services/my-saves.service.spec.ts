import { TestBed } from '@angular/core/testing';

import { MySavesService } from './my-saves.service';

describe('SavesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MySavesService = TestBed.get(MySavesService);
    expect(service).toBeTruthy();
  });
});
