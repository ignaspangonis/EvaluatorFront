import { Component, OnInit } from '@angular/core';
import {MentorService} from '../../services/mentor.service';
import {Mentor} from '../../shared/mentor';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  mentor: Mentor;
  mentorName: string;
  constructor(private mentorService: MentorService) {  }

  ngOnInit(): void {
    this.getMentor();
  }

  getMentor() {
    this.mentorService.getMentor().subscribe(
      response => {
        this.mentor = response;
        this.mentorName = this.mentor.name;
      }
    );
  }
}
