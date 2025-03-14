import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SheetsService } from '../../services/sheets.service';
import { trigger, transition, style, animate } from '@angular/animations';

interface Rsvp {
  range: [number],
  group: any[]
}

@Component({
  selector: 'r-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './r-form.component.html',
  styleUrl: './r-form.component.scss',
  animations: [
    trigger('slideInOut', [
      // This is for the "enter" animation, if you want it to fade in when it enters
      transition(':enter', [
        style({ opacity: 0, transform: "translateX(60px)" }),
        animate('500ms', style({ opacity: 1, transform: "translateX(0px)" }))
      ]),
      // This is for the "leave" animation, it fades out when removed
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: "translateX(-60px)" }))
      ])
    ])
  ]
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
    5: 'songRequest',
    6: 'wow'
  }
  pageCache: number = 1;
  page: string = this.pageEnum[1];


  ngOnInit() {

  }

  onLeaveAnimationDone(e: any) {
    if (e.toState === 'void') {
      if (this.pageCache === 1) {
        this.page = this.pageEnum[2];
        this.pageCache = 2;
      }
      else if (this.pageCache === 2) {
        this.page = this.pageEnum[3];
        this.pageCache = 3;
      }
      else if (this.pageCache === 3) {
        this.page = this.pageEnum[4];
        this.pageCache = 4;
      }
      else if (this.pageCache === 4) {
        this.page = this.pageEnum[5];
        this.pageCache = 5;
      }
    }
  }

  searchInviteInfo() {
    this.sheetService.getInviteInfo(this.name).subscribe((data: any) => {
      this.rsvpLists = data;
      this.page = this.pageEnum[6];
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
    this.page = this.pageEnum[6];
  }

  allergySubmit() {
    this.page = this.pageEnum[6];
  }

  plusOneSubmit() {
    this.page = this.pageEnum[6];
  }

  onSubmit() {
    console.log(this.rsvpLists.group)
  }

}
