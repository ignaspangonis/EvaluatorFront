import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mentor } from '../shared/mentor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  private url = 'https://my-evaluation-platform.herokuapp.com/api/mentor/6';

  constructor(private httpClient: HttpClient) { }

  getMentor(): Observable<Mentor> {
    return this.httpClient.get<Mentor>(this.url);
  }
}
