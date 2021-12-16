import { TestBed } from '@angular/core/testing';

import { TecwebService } from './tecweb.service';

describe('TecwebService', () => {
  let service: TecwebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecwebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
