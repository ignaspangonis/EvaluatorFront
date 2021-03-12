import { Component, OnInit } from '@angular/core';

interface Mentor {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  
  mentor: Mentor[] = [
    {value: 'Minijus Laukaitis', viewValue: 'Minijus Laukaitis'},
    {value: 'Darius Pazusinskis', viewValue: 'Darius Pazusinskis'},
    {value: 'Mantas Boronilščikovas', viewValue: 'Mantas Boronilščikovas'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
