import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SheetsService } from '../../services/sheets.service';

interface Rsvp {
  range: [number],
  group: [string]
}

@Component({
  selector: 'r-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './r-form.component.html',
  styleUrl: './r-form.component.scss'
})
export class RFormComponent implements OnInit {
  sheetService = inject(SheetsService);
  name: string = '';
  rsvpLists: Rsvp = {} as Rsvp;
  pageEnum = {
    1: 'find',
    2: 'invitation',
    3: 'allergy',
    4: 'plus1',
    5: 'songRequest'
  }
  page: string = this.pageEnum[1];


  ngOnInit() {

  }

  searchInviteInfo() {
    this.sheetService.getInviteInfo(this.name).subscribe((data: any) => {
      this.rsvpLists = data;
      this.page = this.pageEnum[2];
    }, err => {
      console.log(err);
    });
  }

  selectRsvp() {
    this.page = this.pageEnum[3];
  }

  allergySubmit() {
    this.page = this.pageEnum[4];
  }

  plusOneSubmit() {
    this.page = this.pageEnum[5];
  }

  onSubmit() {

  }

}
