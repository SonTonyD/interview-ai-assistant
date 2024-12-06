import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface InterviewRecord {
  id: string;
  userId: string;
  questionAnswers: QuestionAnswer[];
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
    userId: '1',
    questionAnswers: [],
  };

  ngOnInit(): void {
    this.step = 1;
  }
  title = 'interview-ai-assistant';

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
    this.interviewRecord.questionAnswers.push(questionAnswer);
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
      this.setSteps(this.step + 1);
    }
  }
}
