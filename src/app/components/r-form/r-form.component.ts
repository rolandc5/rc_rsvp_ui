import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SheetsService } from '../../services/sheets.service';

interface Rsvp {
  range: [number],
  group: any[]
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

  selectedInvitee(e: Event, arrIndex: number) {
    const inviteeChecked = (e.target as HTMLInputElement).checked
    if (inviteeChecked === true) {
      this.rsvpLists.group[arrIndex][0] = 'yes';
    } else {
      this.rsvpLists.group[arrIndex][0] = 'no';
    }
  }

  selectRsvp() {
    this.rsvpLists.group.forEach((invitee: any) => {
      if (invitee[0] === '') {
        invitee[0] = 'no';
      }
    });
    this.page = this.pageEnum[3];
  }

  allergySubmit() {
    
    this.page = this.pageEnum[4];
  }

  plusOneSubmit() {
    this.page = this.pageEnum[5];
  }

  onSubmit() {
    console.log(this.rsvpLists.group)
  }

}
