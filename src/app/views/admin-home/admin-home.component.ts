import {Component, OnInit, ViewChild} from '@angular/core';
import {MatListOption, MatSelectionList} from '@angular/material/list';

import {MatDialog} from '@angular/material/dialog';
import {Mentor} from '../../shared/mentor';
import {MentorAdditionComponent} from '../../components/mentor-addition/mentor-addition.component';
import {MentorService} from '../../services/mentor.service';
import {Observable} from 'rxjs';
import {Student} from '../../shared/student';
import { StudentAdditionComponent } from 'src/app/components/student-addition/student-addition.component';
import {StudentService} from '../../services/student.service';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  students$: Observable<Student[]>;
  mentors$: Observable<Mentor[]>;
  mentorsIds: number[] = [];
  newStudent: Student = {contractType: '', evaluated: false, id: '', image: '', name: '', preferences: []};


  constructor(private studentService: StudentService, private mentorService: MentorService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.students$ = this.studentService.getAllStudents();
    this.mentors$ = this.mentorService.getMentors();
  }

  openMentorDialog(stream: string, mentors: Mentor[]) {
    const mentorAdditionDialog = this.dialog.open(MentorAdditionComponent, {
      data: {str: stream},
      width: '400px',
      height: '400px'
    }).afterClosed().subscribe((responseVariable: any) => {
      if (responseVariable != null) {
      mentors.splice(0, 0, responseVariable.mentor);
      }
    });
   }
   openStudentDialog(student: Student, isStudentExisting: boolean) {
    const studentAdditionDialog = this.dialog.open(StudentAdditionComponent, {
      data: {student},
      width: '600px',
      height: '600px'
    }).afterClosed().subscribe((formData: any) => {
      if (formData != null) {
        this.newStudent.name = formData.name + ' ' + formData.surname;
        this.newStudent.image = formData.image;
        this.newStudent.preferences = formData.preferences;
        this.newStudent.contractType = formData.contractType;
        if (!isStudentExisting) {
          this.studentService.addStudent(this.newStudent).subscribe(() => this.students$ = this.studentService.getAllStudents());
        } else {
          this.studentService.updateStudent(this.newStudent, student.id)
            .subscribe(() => this.students$ = this.studentService.getAllStudents());
        }
      }
     } ) ;
   }
   deleteMentors(selectedOptions: MatListOption[], mentors: Mentor[]){
    for (const option of selectedOptions) {
      this.mentorService.deleteMentor(option.value.id).subscribe(() => {
      });
      const index = mentors.findIndex(element => element.id === option.value.id);
      mentors.splice(index, 1);
     }
   }

   deleteStudent(studentId: number, studentName: string){
    if ( confirm('Are you sure you want to delete ' + studentName + ' ?')) {
        this.studentService.deleteStudent(studentId).subscribe(() => this.students$ = this.studentService.getAllStudents());
      }
    }
}
