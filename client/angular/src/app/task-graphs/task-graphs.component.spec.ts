import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGraphsComponent } from './task-graphs.component';

describe('TaskGraphsComponent', () => {
  let component: TaskGraphsComponent;
  let fixture: ComponentFixture<TaskGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
