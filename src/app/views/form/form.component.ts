import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { Mentor } from 'src/app/shared/mentor';
import { MentorService } from 'src/app/services/mentor.service';
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
      mentorID: [6],
      studentId: [''],
      participation: [''],
      techSkills: [''],
      learningPace: [''],
      extraMile: [''],
      comment: ['']
      });
    this.getStudents();
  }

  reset() {
    this.profileForm.reset();
  }

  onSubmit() {
    this.profileForm.value.participation = parseInt(this.profileForm.value.participation, 10);
    this.profileForm.value.techSkills = parseInt(this.profileForm.value.techSkills, 10);
    this.profileForm.value.learningPace = parseInt(this.profileForm.value.learningPace, 10);
    this.profileForm.value.extraMile = parseInt(this.profileForm.value.extraMile, 10);
    this.studentService.postEvaluation(this.profileForm.value, this.studentId.value).subscribe(() => {
      this.reset();
    });
  }

  getStudents() {
    this.studentService.getStudents().subscribe(
      response => {
        this.students = response;
      }
    );
  }

  get studentId() {
    return this.profileForm.get('studentId') as FormControl;
  }
}
