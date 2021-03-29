import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MentorService} from '../../services/mentor.service';
import {Mentor} from '../../shared/mentor';

@Component({
  selector: 'app-mentor-addition',
  templateUrl: './mentor-addition.component.html',
  styleUrls: ['./mentor-addition.component.scss']
})
export class MentorAdditionComponent implements OnInit {
  mentorAdditionForm: FormGroup;
  newMentor: Mentor = {name: '', stream: ''};
  constructor(@Inject(MAT_DIALOG_DATA) public data: {str: string}, private fb: FormBuilder, private mentorService: MentorService,
              public dialogRef: MatDialogRef<MentorAdditionComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.mentorAdditionForm = this.fb.group({
      name: ['', {validators: [Validators.required]}],
      surname: ['', {validators: [Validators.required]}],
    });
  }
  onSubmit() {
    this.newMentor.name = this.mentorAdditionForm.value.name + ' ' + this.mentorAdditionForm.value.surname;
    this.newMentor.stream = this.data.str;
    this.mentorService.addMentor(this.newMentor).subscribe((mentor) => {this.newMentor.id = mentor.id ;
                                                                        this.dialogRef.close({mentor: this.newMentor});
    } );
  }
  close(){
    this.dialogRef.close(null);
  }

  get name() {
    return this.mentorAdditionForm.get('name') as FormControl;
  }

  get surname() {
    return this.mentorAdditionForm.get('surname') as FormControl;
  }
  get stream(){
    return this.mentorAdditionForm.get('stream') as FormControl;
  }

}
