import {Component, OnInit, ViewChild} from '@angular/core';
import {MatListOption, MatSelectionList} from '@angular/material/list';

import {MatDialog} from '@angular/material/dialog';
import {Mentor} from '../../shared/mentor';
import {MentorAdditionComponent} from '../../components/mentor-addition/mentor-addition.component';
import {MentorService} from '../../services/mentor.service';
import {Observable} from 'rxjs';
import {Student} from '../../shared/student';
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

  constructor(private studentService: StudentService, private mentorService: MentorService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.students$ = this.studentService.getAllStudents();
    this.mentors$ = this.mentorService.getMentors();
  }

  openDialog(stream: string, mentors: Mentor[]) {
    const mentorAdditionDialog = this.dialog.open(MentorAdditionComponent, {
      data: {str: stream},
      width: '400px',
      height: '400px'
    }).afterClosed().subscribe((response: any) => {
      if (response != null) {
      mentors.splice(0, 0, response.mentor);
      }
    });
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
    if(confirm("Are you sure you want to delete " + studentName + " ?")) {
      this.studentService.deleteStudent(studentId).subscribe(() => this.studentService.getAllStudents());
      };
    }
}
