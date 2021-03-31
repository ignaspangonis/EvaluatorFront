import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import {Student} from 'src/app/shared/student';
import {HttpClient} from '@angular/common/http';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: {student: Student}, private fb: FormBuilder, private studentService: StudentService,
              public dialogRef: MatDialogRef<StudentAdditionComponent>, private httpClient: HttpClient, private sanitizer: DomSanitizer) {
    dialogRef.disableClose = true;
   }

  preferences = [{ value: 'Back-end' }, { value: 'Front-end' }, { value: 'Full-stack' }, { value: 'QA' }];
  isImageChanged = false;
  isImageExisting = false;

  ngOnInit(): void {
    this.studentAdditionForm = this.fb.group({
      name: ['', {validators: [Validators.required]}],
      surname: ['', {validators: [Validators.required]}],
      contractType: [''],
      preferences: this.fb.array([]),
      image: ['', {validators: [Validators.required]}],
      id: ['']
    });

    if (this.data.student != null) {
      this.studentAdditionForm.patchValue({
        name: this.data.student.name.split(' ')[0],
        surname: this.data.student.name.split(' ')[1],
        contractType: this.data.student.contractType,
        image: this.data.student.image,
        id: this.data.student.id
      });
      const preferenceArray = this.studentAdditionForm.controls.preferences as FormArray;
      this.data.student.preferences.forEach((preference) => {
        preferenceArray.push(new FormControl(preference));
      });
      this.isImageExisting = true;
    } else {
      this.studentAdditionForm.patchValue({image: this.imageUrl});
    }
  }

  checkIfCheckboxWasSelected(preference: string): boolean {
    const preferenceArray = this.studentAdditionForm.controls.preferences as FormArray;
    const index = preferenceArray.controls.findIndex(x => x.value === preference);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
}

  onChange(preference: string, event: any) {
    const preferenceArray = this.studentAdditionForm.controls.preferences as FormArray;
    if (event.target.checked) {
      preferenceArray.push(new FormControl(preference));
    } else {
      const index = preferenceArray.controls.findIndex(x => x.value === preference);
      preferenceArray.removeAt(index);
    }
  }

  get name() {
    return this.studentAdditionForm.get('name') as FormControl;
  }

  get surname() {
    return this.studentAdditionForm.get('surname') as FormControl;
  }
  get image(){
    return this.studentAdditionForm.get('image') as FormControl;
  }

  close() {
    this.dialogRef.close(null);
  }

  onFileSelected(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile !== null) {
      this.isImageExisting = true;
      this.selectedFile = selectedFile;
      this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl((URL).createObjectURL(this.selectedFile));
      this.studentAdditionForm.patchValue({image: this.imageUrl});
    }
    this.isImageChanged = true;
  }

  onSubmit() {
    if (this.isImageChanged) {
      const formData = new FormData();
      formData.append('upload_preset', 'evaluator-upload');
      formData.append('file', this.selectedFile);
      this.httpClient.post('https://api.cloudinary.com/v1_1/ignaspan/upload', formData, {})
        .subscribe((body: any) => {
          this.studentAdditionForm.value.image = body.url;
          this.dialogRef.close(this.studentAdditionForm.value);
        });
      this.isImageChanged = false;
    } else {
      this.dialogRef.close(this.studentAdditionForm.value);
    }
  }
}
