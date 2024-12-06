import { TestBed } from '@angular/core/testing';

import { InterviewRecordService } from './interview-record.service';

describe('InterviewRecordService', () => {
  let service: InterviewRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
