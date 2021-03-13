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
    {value: 'Petras Petraitis', viewValue: 'Petras Petraitis'},
    {value: 'Vardenis Pavardenis', viewValue: 'Vardenis Pavardenis'},
    {value: 'Auksinis Kardas', viewValue: 'Auksinis Kardas'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
