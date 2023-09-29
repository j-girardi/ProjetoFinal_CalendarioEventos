import { TestBed } from '@angular/core/testing';

import { RequestsUsuariosService } from './requests-usuarios.service';

describe('RequestsUsuariosService', () => {
  let service: RequestsUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
