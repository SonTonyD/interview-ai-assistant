import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterviewRecord } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class InterviewRecordService {
  private readonly apiUrl = 'http://127.0.0.1:8000/interview';

  constructor(private http: HttpClient) {}

  generateFeedback(record: InterviewRecord): Observable<InterviewRecord> {
    return this.http.post<InterviewRecord>(this.apiUrl, record);
  }
}
