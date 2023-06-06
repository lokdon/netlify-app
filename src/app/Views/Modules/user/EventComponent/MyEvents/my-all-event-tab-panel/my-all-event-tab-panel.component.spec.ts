import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAllEventTabPanelComponent } from './my-all-event-tab-panel.component';

describe('MyAllEventTabPanelComponent', () => {
  let component: MyAllEventTabPanelComponent;
  let fixture: ComponentFixture<MyAllEventTabPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAllEventTabPanelComponent]
    });
    fixture = TestBed.createComponent(MyAllEventTabPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
