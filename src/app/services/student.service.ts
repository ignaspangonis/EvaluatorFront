import {Evaluation} from '../shared/evaluation';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Student} from '../shared/student';
import {EvaluationCard} from '../shared/evaluation-card';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = 'https://my-evaluation-platform.herokuapp.com/api/mentor/6';

  constructor(private httpClient: HttpClient) {
  }

  getStudents(): Observable<Student[]> {
    return this.httpClient
      .get<Student[]>(this.url + `/student`);
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
  getEvaluation(studentId: string): Observable<Evaluation | undefined> {
    return this.httpClient
      .get<Evaluation>(this.url + `/student/${studentId}/evaluation`)
      .pipe(
        catchError(this.handleError)
      );
  }

  putEvaluation(evaluation: Evaluation, id: number): Observable<Evaluation> {
    return this.httpClient.put<Evaluation>(`https://my-evaluation-platform.herokuapp.com/api/evaluation/${id}`, evaluation);
  }

  getMentorStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url + `/student`);
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
}
