import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInboxComponent } from './event-inbox.component';

describe('EventInboxComponent', () => {
  let component: EventInboxComponent;
  let fixture: ComponentFixture<EventInboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventInboxComponent]
    });
    fixture = TestBed.createComponent(EventInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
