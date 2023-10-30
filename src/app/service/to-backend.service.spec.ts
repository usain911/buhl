import { TestBed } from '@angular/core/testing';

import { ToBackendService } from './to-backend.service';

describe('ToBackendService', () => {
  let service: ToBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
