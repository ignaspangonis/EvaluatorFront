import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {Evaluation} from '../shared/evaluation';
import {EvaluationCard} from '../shared/evaluation-card';
import {Injectable} from '@angular/core';
import {Student} from '../shared/student';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = 'https://my-evaluation-platform.herokuapp.com/api/mentor/';

  constructor(private httpClient: HttpClient) {
  }

  addStudent(student: Student): Observable<Student>{
    return this.httpClient.post<Student>('https://my-evaluation-platform.herokuapp.com/api/student', student);
  }

  updateStudent(student: Student, id: string){
    return this.httpClient.put<Student>('https://my-evaluation-platform.herokuapp.com/api/student' + id, student);
  }

  getAllStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>('https://my-evaluation-platform.herokuapp.com/api/student');
  }

  getStudents(mentorId: string): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url + mentorId + `/student`);
  }

  getStudentById(id: string): Observable<Student> {
    return this.httpClient
      .get<Student>(`https://my-evaluation-platform.herokuapp.com/api/student/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  postEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.httpClient
      .post<Evaluation>(`https://my-evaluation-platform.herokuapp.com/api/evaluation`, evaluation)
      .pipe(
        catchError(this.handleError)
      );
  }

  // These methods will not used yet:

  getEvaluation(studentId: string, mentorId: string): Observable<Evaluation | undefined> {
    return this.httpClient
      .get<Evaluation>(this.url + mentorId + `/student/${studentId}/evaluation`)
      .pipe(
        catchError(this.handleError)
      );
  }

  putEvaluation(evaluation: Evaluation, id: number): Observable<Evaluation> {
    return this.httpClient.put<Evaluation>(`https://my-evaluation-platform.herokuapp.com/api/evaluation/${id}`, evaluation);
  }

  getMentorStudents(mentorId: string): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url + mentorId + `/student`);
  }

  getJointEvaluation(studentId: string): Observable<EvaluationCard | undefined> {
    return this.httpClient.get<EvaluationCard>(`https://my-evaluation-platform.herokuapp.com/api/student/${studentId}/jointEvaluation`);
  }

  handleError(error: HttpErrorResponse) {
    let errorMsg: string;
    switch (error.status) {
      case 409:
        errorMsg = 'This student is already evaluated! Please go back to Home page and choose the student again.';
        break;
      case 404:
        errorMsg = 'Evaluation form not found! Please go back to Home page and choose the student again.';
        break;
      default:
        errorMsg = 'Server error';
    }
    return throwError(errorMsg);
  }

  deleteStudent(id: number): Observable<Student>{
    return this.httpClient.delete<Student>(`https://my-evaluation-platform.herokuapp.com/api/student/${id}`);
  }
}
