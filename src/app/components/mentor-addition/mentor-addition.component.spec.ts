import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { FormBuilder } from '@angular/forms';
import { MentorAdditionComponent } from './mentor-addition.component';

describe('MentorAdditionComponent', () => {
  let component: MentorAdditionComponent;
  let fixture: ComponentFixture<MentorAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorAdditionComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [
        HttpClient,
        HttpHandler,
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
