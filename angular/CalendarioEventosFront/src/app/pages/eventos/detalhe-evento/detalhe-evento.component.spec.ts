import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheEventoComponent } from './detalhe-evento.component';

describe('DetalheEventoComponent', () => {
  let component: DetalheEventoComponent;
  let fixture: ComponentFixture<DetalheEventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalheEventoComponent]
    });
    fixture = TestBed.createComponent(DetalheEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
