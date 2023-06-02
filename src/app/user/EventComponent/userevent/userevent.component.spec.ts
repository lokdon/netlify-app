import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsereventComponent } from './userevent.component';

describe('UsereventComponent', () => {
  let component: UsereventComponent;
  let fixture: ComponentFixture<UsereventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsereventComponent]
    });
    fixture = TestBed.createComponent(UsereventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
