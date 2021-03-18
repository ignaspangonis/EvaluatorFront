import {Evaluation} from '../shared/evaluation';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Student} from '../shared/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = 'https://my-evaluation-platform.herokuapp.com/api/mentor/6';

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url + `/student`);
  }

  postEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.httpClient.post<Evaluation>(this.url  + `/evaluation`, evaluation);
  }

  // This method will not used in the 1st sprint:
  getEvaluation(id: string): Observable<Student> {
    return this.httpClient.get<Student>(this.url  + `/evaluation/${id}`);
  }

  getEvaluatedStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url + `/student?isEvaluated=1`);
  }

  getNotEvaluatedStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url + `/student?isEvaluated=0`);
  }
  
}
