import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonauthlayoutComponent } from './nonauthlayout.component';

describe('NonauthlayoutComponent', () => {
  let component: NonauthlayoutComponent;
  let fixture: ComponentFixture<NonauthlayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonauthlayoutComponent]
    });
    fixture = TestBed.createComponent(NonauthlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
