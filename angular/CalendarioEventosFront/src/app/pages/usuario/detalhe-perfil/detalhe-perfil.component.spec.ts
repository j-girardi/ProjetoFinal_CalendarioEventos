import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDetalhesComponent } from './detalhe-perfil.component';

describe('PerfilDetalhesComponent', () => {
  let component: PerfilDetalhesComponent;
  let fixture: ComponentFixture<PerfilDetalhesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilDetalhesComponent]
    });
    fixture = TestBed.createComponent(PerfilDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
