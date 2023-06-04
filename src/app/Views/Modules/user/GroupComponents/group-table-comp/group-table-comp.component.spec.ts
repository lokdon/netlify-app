import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTableCompComponent } from './group-table-comp.component';

describe('GroupTableCompComponent', () => {
  let component: GroupTableCompComponent;
  let fixture: ComponentFixture<GroupTableCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupTableCompComponent]
    });
    fixture = TestBed.createComponent(GroupTableCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
