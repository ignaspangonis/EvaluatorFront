import {Evaluation} from '../shared/evaluation';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Student} from '../shared/student';
import {EvaluationCard} from '../shared/evaluation-card';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = 'https://my-evaluation-platform.herokuapp.com/api/mentor/';

  constructor(private httpClient: HttpClient) { }


  getStudents(mentorId: string): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url + mentorId + `/student`);
  }

  getStudentById(id: string): Observable<Student> {
    return this.httpClient.get<Student>(`https://my-evaluation-platform.herokuapp.com/api/student/${id}`);
  }

  postEvaluation(evaluation: Evaluation, studentId: number): Observable<Evaluation> {
    return this.httpClient.post<Evaluation>(`https://my-evaluation-platform.herokuapp.com/api/evaluation`, evaluation);
  }

  // These methods will not used yet:
  getEvaluation(studentId: string, mentorId: string): Observable<Evaluation | undefined> {
    return this.httpClient.get<Evaluation>(this.url  + mentorId + `/student/${studentId}/evaluation`);
  }

  putEvaluation(evaluation: Evaluation, id: number): Observable<Evaluation> {
    return this.httpClient.put<Evaluation>(`https://my-evaluation-platform.herokuapp.com/api/evaluation/${id}`, evaluation);
  }

  getEvaluatedStudents(mentorId: string): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url + mentorId + `/student?isEvaluated=1`);
  }

  // getNotEvaluatedStudents(): Observable<Student[]> {
  //   return this.httpClient.get<Student[]>(this.url + `/student?isEvaluated=0`);
  // }

  getMentorStudents(mentorId: string): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url + mentorId + `/student`);
  }

  getJointEvaluation(studentId: string): Observable<EvaluationCard | undefined> {
    return this.httpClient.get<EvaluationCard>(`https://my-evaluation-platform.herokuapp.com/api/student/${studentId}/jointEvaluation`);
  }
}
