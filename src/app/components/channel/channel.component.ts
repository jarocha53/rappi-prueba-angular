import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { ChannelInterface } from 'src/app/models/channel-interface';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  listChannel: Array<ChannelInterface> = [];
  listChannelOriginal: Array<ChannelInterface> = [];
  typeSort: string = 'orden';
  channelForm: FormGroup = this.formBuilder.group({});

  ngOnInit(): void {
    this.channelForm = this.formBuilder.group({
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
    return !this.channelForm.valid;
  }

  addChannel(): void {
    this.listChannel.push({ name: this.channelForm.get('name')?.value });
    this.channelForm.reset();
  }

  deleteChannel(index: number): void {
    this.listChannel.splice(index, 1);
  }

  sortChannel(): void {
    if (this.typeSort == 'orden') {
      this.listChannelOriginal = [];
      this.listChannel.forEach((channel) =>
        this.listChannelOriginal.push(channel)
      );
    }

    switch (this.typeSort) {
      case 'orden': {
        this.typeSort = 'nameAscending';
        break;
      }
      case 'nameAscending': {
        this.typeSort = 'nameDescending';
        break;
      }
      case 'nameDescending': {
        this.typeSort = 'orden';
        break;
      }
    }

    if (this.typeSort == 'nameAscending') {
      this.listChannel.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      });
    } else if (this.typeSort == 'nameDescending') {
      this.listChannel.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      });
    } else {
      this.listChannel = [];
      this.listChannelOriginal.forEach((channel) =>
        this.listChannel.push(channel)
      );
    }
  }
}
