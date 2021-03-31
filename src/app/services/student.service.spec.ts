import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

import { StudentService } from './student.service';
import { TestBed } from '@angular/core/testing';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler
      ]
    });
    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
