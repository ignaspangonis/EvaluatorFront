import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorAdditionComponent } from './mentor-addition.component';

describe('MentorAdditionComponent', () => {
  let component: MentorAdditionComponent;
  let fixture: ComponentFixture<MentorAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorAdditionComponent ]
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
