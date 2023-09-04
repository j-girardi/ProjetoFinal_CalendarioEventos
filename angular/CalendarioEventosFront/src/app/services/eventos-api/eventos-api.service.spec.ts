import { TestBed } from '@angular/core/testing';

import { EventosApiService } from './eventos-api.service';

describe('EventosApiService', () => {
  let service: EventosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
