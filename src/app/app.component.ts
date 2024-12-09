import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FeedbackRequest,
  InterviewRecordService,
} from './interview-record.service';
import { ProfileInfo, QuestionService } from './question.service';

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

  /* formulaire profile */
  personnal_description = '';
  secteur = '';
  poste = '';
  objectif_entretien = '';
  offre_emploi = '';

  profileInfo: ProfileInfo = {
    id: '1',
    user_id: '1',
    personnal_description: '',
    secteur: '',
    poste: '',
    objectif_entretien: '',
    offre_emploi: '',
  };

  ngOnInit(): void {
    this.step = 1;
  }

  constructor(
    private interviewRecordService: InterviewRecordService,
    private questionService: QuestionService
  ) {}

  setSteps(newStep: number) {
    this.step = newStep;
  }

  submitForm() {
    this.profileInfo.personnal_description = this.personnal_description;
    this.profileInfo.secteur = this.secteur;
    this.profileInfo.poste = this.poste;
    this.profileInfo.objectif_entretien = this.objectif_entretien;
    this.profileInfo.offre_emploi = this.offre_emploi;

    this.questionService
      .generateQuestionsBasedOnProfile(this.profileInfo)
      .subscribe((result: string[]) => {
        this.technicalQuestions = result;
        this.simulationQuestions = this.getRandomQuestions(result, 3);
        if (this.step) {
          this.setSteps(this.step + 1);
        }
      });
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

      const feedback: FeedbackRequest = {
        record: this.interviewRecord,
        profile: this.profileInfo,
      };

      this.interviewRecordService
        .generateFeedback(feedback)
        .subscribe((newRecord: InterviewRecord) => {
          this.interviewRecord = newRecord;
          if (this.step) {
            this.setSteps(this.step + 1);
          }
        });
    }
  }

  private getRandomQuestions(questions: string[], count: number): string[] {
    if (questions.length <= count) {
      return questions; // Si moins de questions que le nombre demandé, retourner tout
    }

    const shuffled = [...questions].sort(() => 0.5 - Math.random()); // Mélanger les questions
    return shuffled.slice(0, count); // Récupérer les `count` premières
  }
}
