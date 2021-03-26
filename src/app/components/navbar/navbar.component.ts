
import {Component, Input, OnInit} from '@angular/core';
import {MentorService} from '../../services/mentor.service';
import {Mentor} from '../../shared/mentor';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() mentorId;
  mentor$: Observable<Mentor>;
  constructor(private mentorService: MentorService) {  }

  ngOnInit(): void {
    this.getMentor();
  }

  getMentor() {
    this.mentor$ = this.mentorService.getMentor(this.mentorId);
  }
}
