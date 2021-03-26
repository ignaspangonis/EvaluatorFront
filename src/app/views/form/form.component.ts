import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


import {Student} from 'src/app/shared/student';
import {StudentService} from '../../services/student.service';
import {concat, Observable, of} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Evaluation} from '../../shared/evaluation';

import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {EvaluationService} from '../../services/evaluation.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  profileForm: FormGroup;
  student$: Observable<Student>;
  mentorId: string;
  id: string;
  isEvaluated: boolean;
  evaluation: Evaluation;
  evaluationId: number;
  maxCharacters = 150;
  charsRemaining$: Observable<number>;
  isValid = true;
  @Input()
  maxlength: string | number;
  errorMsg: string;

  constructor(private route: ActivatedRoute, private studentService: StudentService, private fb: FormBuilder,
              private router: Router, private evaluationService: EvaluationService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
        this.mentorId = params.get('mentorId');
        this.student$ = this.studentService.getStudentById(this.id);
      });

    this.route.queryParams.subscribe(params => {
      this.isEvaluated = params['isEvaluated'] === 'true';
    });

    this.profileForm = this.fb.group({
      mentorID: [this.mentorId],
      studentId: [this.id, [Validators.required]],
      participation: ['', [Validators.required]],
      techSkills: ['', [Validators.required]],
      learningPace: ['', [Validators.required]],
      extraMile: ['', [Validators.required]],
      comment: ['', [Validators.maxLength(this.maxCharacters)]]
    });

    if (this.isEvaluated === true) {
      this.studentService.getEvaluation(this.id, this.mentorId).subscribe((evaluation) => {

        this.evaluation = evaluation;
        this.profileForm.patchValue({
          mentorID: this.evaluation.mentorID,
          studentId: this.evaluation.studentId,
          participation: this.evaluation.participation.toString(),
          techSkills: this.evaluation.techSkills.toString(),
          learningPace: this.evaluation.learningPace.toString(),
          extraMile: this.evaluation.extraMile.toString(),
          comment: this.evaluation.comment,
        });
        this.evaluationId = this.evaluation.id;
      }, error => this.errorMsg = error);
    }
    this.charsRemaining$ = concat(of(''), this.comment.valueChanges).pipe(
      map((content) => {
        return this.maxCharacters - (content?.length || 0);
      })
    );
    this.evaluationService.isEvaluationSaved = false;
  }

  get studentId() {
    return this.profileForm.get('studentId') as FormControl;
  }

  get participation() {
    return this.profileForm.get('participation') as FormControl;
  }

  get techSkills() {
    return this.profileForm.get('techSkills') as FormControl;
  }

  get learningPace() {
    return this.profileForm.get('learningPace') as FormControl;
  }

  get extraMile() {
    return this.profileForm.get('extraMile') as FormControl;
  }

  get comment() {
    return this.profileForm.get('comment') as FormControl;
  }

  reset() {
    this.profileForm.reset();
  }

  onSubmit() {
    if (!this.profileForm.valid) {
      this.isValid = false;
      this.scrollToError();
      return;
    }
    this.profileForm.value.studentId = parseInt(this.profileForm.value.studentId, 10);
    this.profileForm.value.participation = parseInt(this.profileForm.value.participation, 10);
    this.profileForm.value.techSkills = parseInt(this.profileForm.value.techSkills, 10);
    this.profileForm.value.learningPace = parseInt(this.profileForm.value.learningPace, 10);
    this.profileForm.value.extraMile = parseInt(this.profileForm.value.extraMile, 10);

    if (this.isEvaluated) {

      this.studentService.putEvaluation(this.profileForm.value, this.evaluationId).subscribe(() => {
        this.router.navigate(['mentor/', this.mentorId, 'home']);
      }, error => this.errorMsg = error);
    } else {
      this.studentService.postEvaluation(this.profileForm.value, this.studentId.value).subscribe(() => {
        this.router.navigate(['mentor/', this.mentorId, 'home']);
      }, error => this.errorMsg = error);
    }
    this.evaluationService.setIsEvaluationSaved(true);
  }

  private scrollToError() {
    const firstInvalidControl = document.querySelector(
      '.ng-invalid[formControlName]'
    );
    firstInvalidControl.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
}
