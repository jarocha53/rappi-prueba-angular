import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { TeamInterface } from 'src/app/models/team-interface';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  listTeam: Array<TeamInterface> = [];

  teamForm: FormGroup = this.formBuilder.group({});

  ngOnInit(): void {
    this.teamForm = this.formBuilder.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/[0-9]{0}[a-zA-ZÑñÁÉÍÓÚáéíóú]{1}/),
        ])
      ),
    });
  }

  validForm(): boolean {
    return !this.teamForm.valid;
  }

  addTeam(): void {
    this.listTeam.push({ name: this.teamForm.get('name')?.value });
    this.teamForm.reset();
  }
}
