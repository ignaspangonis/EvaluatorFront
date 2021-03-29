import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import {Student} from 'src/app/shared/student';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-student-addition',
  templateUrl: './student-addition.component.html',
  styleUrls: ['./student-addition.component.scss']
})
export class StudentAdditionComponent implements OnInit {
  studentAdditionForm: FormGroup;
  selectedFile = null;
  imageUrl: SafeResourceUrl = 'https://gladstoneentertainment.com/wp-content/uploads/2018/08/blank-portrait.png';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {str: string}, private fb: FormBuilder, private studentService: StudentService,
              public dialogRef: MatDialogRef<StudentAdditionComponent>, private httpClient: HttpClient, private sanitizer: DomSanitizer) {
    dialogRef.disableClose = true;
   }

  ngOnInit(): void {
    this.studentAdditionForm = this.fb.group({
      name: ['', {validators: [Validators.required]}],
      surname: ['', {validators: [Validators.required]}],
    });
  }

  get name() {
    return this.studentAdditionForm.get('name') as FormControl;
  }

  get surname() {
    return this.studentAdditionForm.get('surname') as FormControl;
  }

  close() {
    this.dialogRef.close(null);
  }

  onFileSelected(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile !== null) {
      this.selectedFile = selectedFile;
      this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl((URL).createObjectURL(this.selectedFile));
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('upload_preset', 'evaluator-upload');
    formData.append('file', this.selectedFile);
    this.httpClient.post('https://api.cloudinary.com/v1_1/ignaspan/upload', formData, {
      observe: 'events'
    })
      .subscribe(event => {
        console.log(JSON.parse(JSON.stringify(event)).body.url);
      });
  }

}
