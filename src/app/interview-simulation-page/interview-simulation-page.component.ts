import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FeedbackRequest,
  InterviewRecordService,
} from '../interview-record.service';
import { ProfileInfo, QuestionService } from '../question.service';

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
  selector: 'app-interview-simulation-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './interview-simulation-page.component.html',
  styleUrl: './interview-simulation-page.component.css',
})
export class InterviewSimulationPageComponent implements OnInit {
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
    id: '123456',
    user_id: 'user_789',
    question_answers: [
      {
        question: 'Pouvez-vous me parler de vous et de votre parcours ?',
        answer:
          "Je suis développeur full stack avec une expertise en Angular et Java Spring. J'ai travaillé sur plusieurs projets personnels et professionnels, notamment dans le domaine de la finance.",
        feedback:
          'Votre réponse est claire et montre une bonne maîtrise de vos compétences. Cependant, vous pourriez ajouter un exemple spécifique de projet pour renforcer votre propos.',
      },
      {
        question: "Comment gérez-vous les conflits au sein d'une équipe ?",
        answer:
          'Je favorise toujours la communication ouverte et la médiation pour résoudre les différends. Je veille à écouter toutes les parties et à trouver une solution acceptable pour tout le monde.',
        feedback:
          'Bonne approche. Vous pourriez inclure un exemple concret de gestion de conflit pour illustrer vos compétences en résolution de problèmes.',
      },
      {
        question:
          'Pouvez-vous décrire un défi technique que vous avez surmonté ?',
        answer:
          "Lors d'un projet récent, j'ai optimisé les performances d'une application en réduisant les temps de chargement de 50 % grâce à des techniques de mise en cache et à l'optimisation des requêtes API.",
        feedback:
          'Excellente réponse avec des résultats mesurables. Vous pourriez préciser les outils ou technologies utilisés pour renforcer votre crédibilité.',
      },
      {
        question: 'Où vous voyez-vous dans cinq ans ?',
        answer:
          "Je me vois évoluer vers un rôle de lead développeur, en encadrant une équipe et en participant à des projets stratégiques pour l'entreprise.",
        feedback:
          'Votre vision est cohérente et alignée sur une progression logique. Vous pourriez toutefois mentionner comment vous comptez acquérir les compétences nécessaires pour ce rôle.',
      },
      {
        question: 'Quelles sont vos forces et vos faiblesses ?',
        answer:
          "Ma principale force est ma capacité à apprendre rapidement et à m'adapter aux nouvelles technologies. Une faiblesse serait que je me concentre parfois trop sur les détails, mais j'y travaille en priorisant mieux mes tâches.",
        feedback:
          'Bonne identification de vos forces et faiblesses. Vous pourriez expliquer comment votre capacité à apprendre compense vos éventuelles lacunes liées au perfectionnisme.',
      },
    ],
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
