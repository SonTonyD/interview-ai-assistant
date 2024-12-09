import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewSimulationPageComponent } from './interview-simulation-page.component';

describe('InterviewSimulationPageComponent', () => {
  let component: InterviewSimulationPageComponent;
  let fixture: ComponentFixture<InterviewSimulationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewSimulationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewSimulationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
