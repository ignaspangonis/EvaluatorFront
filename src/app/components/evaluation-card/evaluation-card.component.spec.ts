import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

import { EvaluationCardComponent } from './evaluation-card.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('EvaluationCardComponent', () => {
  let component: EvaluationCardComponent;
  let fixture: ComponentFixture<EvaluationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationCardComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: MAT_DIALOG_DATA, useValue: {} }
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
