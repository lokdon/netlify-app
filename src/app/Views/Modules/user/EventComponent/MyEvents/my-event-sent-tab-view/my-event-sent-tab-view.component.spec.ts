import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventSentTabViewComponent } from './my-event-sent-tab-view.component';

describe('MyEventSentTabViewComponent', () => {
  let component: MyEventSentTabViewComponent;
  let fixture: ComponentFixture<MyEventSentTabViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyEventSentTabViewComponent]
    });
    fixture = TestBed.createComponent(MyEventSentTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
