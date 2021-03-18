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

  postEvaluation(evaluation: Evaluation, studentId: number): Observable<Evaluation> {
    console.log(evaluation);
    return this.httpClient.post<Evaluation>(`https://my-evaluation-platform.herokuapp.com/api/evaluation`, evaluation);
  }

  // These methods will not used yet:
  getEvaluation(studentId: number): Observable<Student> {
    return this.httpClient.get<Student>(this.url  + `/student/${studentId}/evaluation`);
  }

  putEvaluation(evaluation: Evaluation, studentId: number): Observable<Evaluation> {
    return this.httpClient.put<Evaluation>(this.url  + `https://my-evaluation-platform.herokuapp.com/api/evaluation`, evaluation);
  }
}
