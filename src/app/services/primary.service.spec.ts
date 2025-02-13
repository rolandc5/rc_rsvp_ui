import { TestBed } from '@angular/core/testing';

import { PrimaryService } from './primary.service';

describe('PrimaryService', () => {
  let service: PrimaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
