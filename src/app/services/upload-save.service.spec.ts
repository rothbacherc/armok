import { TestBed } from '@angular/core/testing';

import { UploadSaveService } from './upload-save.service';

describe('UploadSaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadSaveService = TestBed.get(UploadSaveService);
    expect(service).toBeTruthy();
  });
});
