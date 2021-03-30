import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Mentor} from '../../shared/mentor';
import {MentorService} from '../../services/mentor.service';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {
  subscription: Subscription;
  mentors: Mentor[];
  mentor: Mentor;
  identificationForm: FormGroup;
  constructor(private mentorService: MentorService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.identificationForm = this.fb.group({
      selectedMentor: ['', {validators: [Validators.required]}]
    });

    this.subscription = this.mentorService.getMentors().subscribe((mentors) => {this.mentors = mentors; } );

  }

  get selectedMentor() {
    return this.identificationForm.get('selectedMentor');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
