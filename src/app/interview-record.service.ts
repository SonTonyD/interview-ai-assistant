import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterviewRecord } from './app.component';
import { ProfileInfo } from './question.service';

export interface FeedbackRequest {
  record: InterviewRecord;
  profile: ProfileInfo;
}

@Injectable({
  providedIn: 'root',
})
export class InterviewRecordService {
  private readonly apiUrl = 'http://127.0.0.1:8000/interview';

  constructor(private http: HttpClient) {}

  generateFeedback(feedback: FeedbackRequest): Observable<InterviewRecord> {
    return this.http.post<InterviewRecord>(this.apiUrl, feedback);
  }
}
