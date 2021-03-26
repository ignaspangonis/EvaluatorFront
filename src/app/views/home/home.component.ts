import {Component, Input, OnInit} from '@angular/core';

import {EvaluationCardComponent} from '../../components/evaluation-card/evaluation-card.component';
import {EvaluationService} from '../../services/evaluation.service';
import {MatDialog} from '@angular/material/dialog';
import {Mentor} from 'src/app/shared/mentor';
import {MentorService} from 'src/app/services/mentor.service';
import {Observable} from 'rxjs';
import {Student} from 'src/app/shared/student';
import {StudentService} from 'src/app/services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isEvaluationSaved: boolean;
  students$: Observable<Student[]>;
  mentor: Mentor;
  mentorStream;

  constructor(public dialog: MatDialog, private studentService: StudentService, private mentorService: MentorService,
              private evaluationService: EvaluationService) {
  }

  ngOnInit(): void {
    this.students$ = this.studentService.getMentorStudents();
    this.getMentor();
    this.isEvaluationSaved = this.evaluationService.getIsEvaluationSaved();
    if (this.isEvaluationSaved) {
      setTimeout(() => {
        this.isEvaluationSaved = false;
        this.evaluationService.setIsEvaluationSaved(false);
      }, 6000);
    }
  }

  openDialog(student: Student) {
    this.dialog.open(EvaluationCardComponent, {
      data: {stud: student},
      width: '900px',
      height: '600px'
    });
  }

  getMentor() {
    this.mentorService.getMentor().subscribe(
      response => {
        this.mentor = response;
        this.mentorStream = this.mentor.stream;
      }
    );
  }
}
