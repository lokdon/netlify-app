import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventReplyTabViewComponent } from './my-event-reply-tab-view.component';

describe('MyEventReplyTabViewComponent', () => {
  let component: MyEventReplyTabViewComponent;
  let fixture: ComponentFixture<MyEventReplyTabViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyEventReplyTabViewComponent]
    });
    fixture = TestBed.createComponent(MyEventReplyTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
