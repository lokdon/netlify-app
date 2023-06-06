import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventTabViewContainerComponent } from './my-event-tab-view-container.component';

describe('MyEventTabViewContainerComponent', () => {
  let component: MyEventTabViewContainerComponent;
  let fixture: ComponentFixture<MyEventTabViewContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyEventTabViewContainerComponent]
    });
    fixture = TestBed.createComponent(MyEventTabViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
