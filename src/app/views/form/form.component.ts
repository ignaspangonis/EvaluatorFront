import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


import {Student} from 'src/app/shared/student';
import {StudentService} from '../../services/student.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Evaluation} from '../../shared/evaluation';
import { Router } from '@angular/router';
import {EvaluationService} from '../../services/evaluation.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  profileForm: FormGroup;
  student$: Observable<Student>;
  id: string;
  isEvaluated: string;
  evaluation: Evaluation;
  evaluationId: number;

  constructor(private route: ActivatedRoute, private studentService: StudentService, private fb: FormBuilder,
              private router: Router, private evaluationService: EvaluationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
        this.student$ = this.studentService.getStudentById(this.id);
      });

    this.route.queryParams.subscribe(params => {
      this.isEvaluated = params['isEvaluated'];
    });

    this.profileForm = this.fb.group({
      mentorID: [6],
      studentId: [this.id],
      participation: [''],
      techSkills: [''],
      learningPace: [''],
      extraMile: [''],
      comment: ['']
    });

    if (this.isEvaluated === 'true') {
      this.studentService.getEvaluation(this.id).subscribe((evaluation) => {
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
      });
    }
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
    if (this.isEvaluated === 'false') {
      this.studentService.postEvaluation(this.profileForm.value, this.studentId.value).subscribe(() => {
        this.reset();
      });
    } else if (this.isEvaluated === 'true') {
      this.studentService.putEvaluation(this.profileForm.value, this.evaluationId).subscribe(() => {
        this.reset();
      });
    }
    this.evaluationService.setIsEvaluationSaved(true);
    this.router.navigate(['mentor/6/home']);
  }

  get studentId() {
    return this.profileForm.get('studentId') as FormControl;
  }
}
