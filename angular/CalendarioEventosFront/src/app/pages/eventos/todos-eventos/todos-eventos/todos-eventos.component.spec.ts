import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosEventosComponent } from './todos-eventos.component';

describe('TodosEventosComponent', () => {
  let component: TodosEventosComponent;
  let fixture: ComponentFixture<TodosEventosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosEventosComponent]
    });
    fixture = TestBed.createComponent(TodosEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
