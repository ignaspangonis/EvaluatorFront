import {Component, Inject, OnInit} from '@angular/core';
import {StudentService} from '../../services/student.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EvaluationCard} from '../../shared/evaluation-card';
import {Student} from '../../shared/student';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-evaluation-card',
  templateUrl: './evaluation-card.component.html',
  styleUrls: ['./evaluation-card.component.scss']
})
export class EvaluationCardComponent implements OnInit {

  public card: EvaluationCard = null;

  constructor(private studentService: StudentService,
              @Inject(MAT_DIALOG_DATA) public data: {stud: Student}) { }

  ngOnInit(): void {
    this.studentService.getJointEvaluation(this.data.stud.id).subscribe(
      response => {
        this.card = response;
        // console.log(this.card.beEvaluationDTO);
      }
    );
  }

}
