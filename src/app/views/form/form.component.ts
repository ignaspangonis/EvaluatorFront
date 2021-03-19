import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { Student } from 'src/app/shared/student';
import { StudentService } from '../../services/student.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  selectedValue: string;
  profileForm: FormGroup;
  student$: Observable<Student>;
  id: string;

  constructor(private route: ActivatedRoute, private studentService: StudentService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
        console.log(this.id);
        this.student$ = this.studentService.getStudentById(this.id);
      });
    console.log(this.student$);
    this.profileForm = this.fb.group({
      mentorID: [6],
      studentId: [this.id],
      participation: [''],
      techSkills: [''],
      learningPace: [''],
      extraMile: [''],
      comment: ['']
    });
  }

  reset() {
    this.profileForm.reset();
  }

  onSubmit() {
    this.profileForm.value.studentId = parseInt(this.profileForm.value.studentId, 10);
    this.profileForm.value.participation = parseInt(this.profileForm.value.participation, 10);
    this.profileForm.value.techSkills = parseInt(this.profileForm.value.techSkills, 10);
    this.profileForm.value.learningPace = parseInt(this.profileForm.value.learningPace, 10);
    this.profileForm.value.extraMile = parseInt(this.profileForm.value.extraMile, 10);
    this.studentService.postEvaluation(this.profileForm.value, this.studentId.value).subscribe(() => {
      this.reset();
    });
  }

  get studentId() {
    return this.profileForm.get('studentId') as FormControl;
  }
}
