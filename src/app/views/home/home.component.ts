import { Component, OnInit } from '@angular/core';

import { Student } from 'src/app/shared/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getEvaluatedStudents();
  }
 
  getEvaluatedStudents() {
    this.studentService.getEvaluatedStudents().subscribe(
      response => {
        this.students = response;
      }
    )
  };

}
