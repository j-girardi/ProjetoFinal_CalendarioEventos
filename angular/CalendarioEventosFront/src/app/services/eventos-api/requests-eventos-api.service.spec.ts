import { TestBed } from '@angular/core/testing';

import { RequestsEventosService } from './requests-eventos-api.service';

describe('EventosApiService', () => {
  let service: RequestsEventosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsEventosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
