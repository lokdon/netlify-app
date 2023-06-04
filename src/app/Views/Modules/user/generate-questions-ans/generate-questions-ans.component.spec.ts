import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQuestionsAnsComponent } from './generate-questions-ans.component';

describe('GenerateQuestionsAnsComponent', () => {
  let component: GenerateQuestionsAnsComponent;
  let fixture: ComponentFixture<GenerateQuestionsAnsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateQuestionsAnsComponent]
    });
    fixture = TestBed.createComponent(GenerateQuestionsAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
