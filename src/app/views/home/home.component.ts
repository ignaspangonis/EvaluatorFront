import { Component, OnInit } from '@angular/core';

import { Mentor } from 'src/app/shared/mentor';
import { MentorService } from 'src/app/services/mentor.service';
import { Student } from 'src/app/shared/student';
import { StudentService } from 'src/app/services/student.service';
import {MatDialog} from '@angular/material/dialog';
import {EvaluationCardComponent} from '../../components/evaluation-card/evaluation-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  students: Student[];
  mentor: Mentor;
  mentorStream;
  constructor(public dialog: MatDialog, private studentService: StudentService,  private mentorService: MentorService) { }

  ngOnInit(): void {
    this.getMentorStudents();
    this.getMentor();
  }

  openDialog(student: Student) {
    this.dialog.open(EvaluationCardComponent, {
      data: { stud: student },
      width: '600px',
      height: '600px'
    });
  }

  getMentorStudents() {
    this.studentService.getMentorStudents().subscribe(
      response => {
        this.students = response;
      }
    );
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
