import { TestBed } from '@angular/core/testing';

import { DispatchlogService } from './dispatchlog.service';

describe('DispatchlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DispatchlogService = TestBed.get(DispatchlogService);
    expect(service).toBeTruthy();
  });
});
