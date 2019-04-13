import { TestBed } from '@angular/core/testing';

import { SelectSaveService } from './select-save.service';

describe('SelectSaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectSaveService = TestBed.get(SelectSaveService);
    expect(service).toBeTruthy();
  });
});
