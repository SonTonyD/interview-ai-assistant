import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InterviewRecordService } from './interview-record.service';

export interface InterviewRecord {
  id: string;
  user_id: string;
  question_answers: QuestionAnswer[];
}

export interface QuestionAnswer {
  question: string;
  answer: string;
  feedback?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  step?: number;
  technicalQuestions: string[] = [
    `Y'a t il du multihéritage en java ?`,
    `Qu'est-ce que la clean architecture`,
    `Quelles est la différence entre le SQL et le NoSQL ?`,
  ];

  currentQuestionNumber = 0;
  simulationQuestions: string[] = [
    `Y'a t il du multihéritage en java ?`,
    `Qu'est-ce que la clean architecture`,
    `Quelles est la différence entre le SQL et le NoSQL ?`,
  ];

  currentAnswer: any;

  interviewRecord: InterviewRecord = {
    id: '1',
    user_id: '1',
    question_answers: [],
  };
  title = 'interview-ai-assistant';

  ngOnInit(): void {
    this.step = 1;
  }

  constructor(private interviewRecordService: InterviewRecordService) {}

  setSteps(newStep: number) {
    this.step = newStep;
  }

  updateInterviewRecordQuestionAnswers(
    currentQuestion: string,
    currentAnswer: string
  ) {
    const questionAnswer: QuestionAnswer = {
      question: currentQuestion,
      answer: currentAnswer,
    };
    this.interviewRecord.question_answers.push(questionAnswer);
  }

  nextQuestion() {
    this.updateInterviewRecordQuestionAnswers(
      this.simulationQuestions[this.currentQuestionNumber],
      this.currentAnswer
    );
    //reset the text area
    this.currentAnswer = '';

    if (this.simulationQuestions[this.currentQuestionNumber + 1]) {
      this.currentQuestionNumber += 1;
    }
  }

  onFinishSimulation() {
    if (this.step) {
      this.updateInterviewRecordQuestionAnswers(
        this.simulationQuestions[this.currentQuestionNumber],
        this.currentAnswer
      );

      this.interviewRecordService
        .generateFeedback(this.interviewRecord)
        .subscribe((newRecord: InterviewRecord) => {
          this.interviewRecord = newRecord;
        });

      this.setSteps(this.step + 1);
    }
  }
}
