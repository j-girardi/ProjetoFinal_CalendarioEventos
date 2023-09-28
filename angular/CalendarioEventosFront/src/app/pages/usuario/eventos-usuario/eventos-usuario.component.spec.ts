import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosUsuarioComponent } from './eventos-usuario.component';

describe('EventosUsuarioComponent', () => {
  let component: EventosUsuarioComponent;
  let fixture: ComponentFixture<EventosUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventosUsuarioComponent]
    });
    fixture = TestBed.createComponent(EventosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
