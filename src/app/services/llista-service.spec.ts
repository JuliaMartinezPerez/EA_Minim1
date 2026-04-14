import { TestBed } from '@angular/core/testing';

import { LlistaService } from './llista-service';

describe('LlistaService', () => {
  let service: LlistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
