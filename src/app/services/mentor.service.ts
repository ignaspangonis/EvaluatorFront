import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mentor } from '../shared/mentor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  private url = 'https://my-evaluation-platform.herokuapp.com/api/mentor';

  constructor(private httpClient: HttpClient) { }

  getMentor(id: string): Observable<Mentor> {
    return this.httpClient.get<Mentor>(this.url + '/' + id);
  }
  getMentors(): Observable<Mentor[]>{
    return this.httpClient.get<Mentor[]>(this.url);
  }
}
