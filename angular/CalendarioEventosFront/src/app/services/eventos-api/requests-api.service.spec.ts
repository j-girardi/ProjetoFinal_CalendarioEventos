import { TestBed } from '@angular/core/testing';

import { RequestsApiService } from './requests-api.service';

describe('EventosApiService', () => {
  let service: RequestsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
