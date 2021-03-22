import { Component, OnInit } from '@angular/core';

import { Mentor } from 'src/app/shared/mentor';
import { MentorService } from 'src/app/services/mentor.service';
import { Student } from 'src/app/shared/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  students: Student[];
  mentor: Mentor;
  mentorStream;
  constructor(private studentService: StudentService,  private mentorService: MentorService) { }

  ngOnInit(): void {
    this.getMentorStudents();
    this.getMentor();
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
