import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from 'src/app/shared/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  students: Student[];
  selectedValue: string;
  profileForm: FormGroup;
  constructor(private studentService: StudentService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      studentId: [''],
      participation: [''],
      techSkills: [''],
      learningPace: [''],
      extraMile: [''],
      comment: ['']
      });
    this.getStudents();
  }

  onSubmit() {}

  getStudents() {
    this.studentService.getStudents().subscribe(
      response => {
        this.students = response;
      }
    );
  }
}
