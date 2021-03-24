import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Mentor} from '../shared/mentor';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  isEvaluationSaved: boolean;

  constructor() {
    this.isEvaluationSaved = false;
  }

  getIsEvaluationSaved(): boolean {
    return this.isEvaluationSaved;
  }

  setIsEvaluationSaved(isEvaluationSaved: boolean): void {
    this.isEvaluationSaved = isEvaluationSaved;
  }
}
