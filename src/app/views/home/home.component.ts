import {ActivatedRoute, ParamMap} from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {EvaluationCardComponent} from '../../components/evaluation-card/evaluation-card.component';
import {EvaluationService} from '../../services/evaluation.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Mentor} from 'src/app/shared/mentor';
import {MentorService} from 'src/app/services/mentor.service';
import {Student} from 'src/app/shared/student';
import {StudentService} from 'src/app/services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  subscription: Subscription;
  isEvaluationSaved: boolean;
  students$: Observable<Student[]>;
  mentor: Mentor;
  mentorStream;
  mentorId: string;

      constructor(public dialog: MatDialog, private studentService: StudentService,  private mentorService: MentorService,
                  private evaluationService: EvaluationService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.mentorId = params.get('mentorId');
      });
    this.students$ = this.studentService.getMentorStudents(this.mentorId);

    this.getMentor(this.mentorId);
    this.isEvaluationSaved = this.evaluationService.getIsEvaluationSaved();

    if (this.isEvaluationSaved) {
      this.snackBar.open('Your evaluation has been saved', 'close', {
        duration: 6000,
      });
      this.isEvaluationSaved = false;
      this.evaluationService.setIsEvaluationSaved(false);
    }
  }

  openDialog(student: Student) {
    this.dialog.open(EvaluationCardComponent, {
      data: {stud: student},
      width: '900px',
      height: '600px'
    });
  }

  getMentor(mentorId: string) {
    this.mentorService.getMentor(mentorId).subscribe(
      response => {
        this.mentor = response;
        this.mentorStream = this.mentor.stream;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
