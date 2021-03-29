import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import {Student} from 'src/app/shared/student';


@Component({
  selector: 'app-student-addition',
  templateUrl: './student-addition.component.html',
  styleUrls: ['./student-addition.component.scss']
})
export class StudentAdditionComponent implements OnInit {
  studentAdditionForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {str: string}, private fb: FormBuilder, private studentService: StudentService,
  public dialogRef: MatDialogRef<StudentAdditionComponent>) {
    dialogRef.disableClose = true;
   }

  ngOnInit(): void {
    this.studentAdditionForm = this.fb.group({
      name: ['', {validators: [Validators.required]}],
      surname: ['', {validators: [Validators.required]}],
    });
  }

  close(){
    this.dialogRef.close(null);
  }

  get name() {
    return this.studentAdditionForm.get('name') as FormControl;
  }

  get surname() {
    return this.studentAdditionForm.get('surname') as FormControl;
  }
  
}
