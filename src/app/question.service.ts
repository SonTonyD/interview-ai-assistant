import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProfileInfo {
  id: string;
  user_id: string;
  personnal_description: string;
  secteur: string;
  poste: string;
  objectif_entretien: string;
  offre_emploi: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private readonly apiUrl = 'http://127.0.0.1:8000/question';
  private readonly apiUrl2 =
    'https://interview-ai-assistant-api.onrender.com/question';

  constructor(private http: HttpClient) {}

  generateQuestionsBasedOnProfile(
    profileInfo: ProfileInfo
  ): Observable<string[]> {
    return this.http.post<string[]>(this.apiUrl, profileInfo);
  }
}
