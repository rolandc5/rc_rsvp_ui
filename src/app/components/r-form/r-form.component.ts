import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SheetsService } from '../../services/sheets.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

interface Rsvp {
  range: [number],
  group: any[]
}

@Component({
  selector: 'r-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './r-form.component.html',
  styleUrl: './r-form.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: "translateX(60px)" }),
        animate('500ms', style({ opacity: 1, transform: "translateX(0px)" }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: "translateX(-60px)" }))
      ])
    ])
  ]
})
export class RFormComponent implements OnInit {
  sheetService = inject(SheetsService);
  name: string = '';
  allergy: string = '';
  plusOne: string = '';
  songRequest: string = '';
  rsvpLists: Rsvp = {} as Rsvp;
  pageAnimation: boolean = false;
  searchError: boolean = false;
  pageEnum = {
    1: 'find',
    2: 'confirmed',
    3: 'invitation',
    4: 'allergy',
    5: 'plus1',
    6: 'songRequest',
    7: 'thankyou',
    8: 'none'
  }
  pageCache: number = 1;
  page: string = this.pageEnum[1];


  ngOnInit() {
    // this.searchInviteInfo()
  }

  onLeaveAnimationDone(e: any) {
    if (e.toState === 'void') {
      this.pageAnimation = false;
    }
  }

  selectedInvitee(e: Event, arrIndex: number) {
    const selectedRadio = (e.target as HTMLInputElement).id
    if (selectedRadio === `attending${arrIndex}`) {
      this.rsvpLists.group[arrIndex][0] = 'yes';
    } else {
      this.rsvpLists.group[arrIndex][0] = 'no';
    }
  }

  radioSelect(e: Event) {
    const selectedRadio = (e.target as HTMLInputElement).id;
    if (selectedRadio === 'interested') {
      this.plusOne = 'yes';
    } else if (selectedRadio === 'not-interested') {
      this.plusOne = 'no';
    }
  }

  searchInviteInfo() {
    this.sheetService.getInviteInfo(this.name).subscribe((data: any) => {
      this.rsvpLists = data;
      this.page = this.pageEnum[3];
      this.pageAnimation = false;
      this.searchError = false;
    }, err => {
      this.searchError = true;
    });
  }

  selectRsvp() {
    this.rsvpLists.group.forEach((invitee: any) => {
      if (invitee[0] === '') {
        invitee[0] = 'no';
      }
    });
    this.page = this.pageEnum[4];
    this.pageAnimation = true;
  }

  allergySubmit() {
    this.rsvpLists.group.forEach((invitee: any) => {
      invitee[5] = this.allergy;
    });
    this.page = this.pageEnum[5];
    this.pageAnimation = true;
  }

  plusOneSubmit() {
    this.rsvpLists.group.forEach((invitee: any) => {
      invitee[6] = this.plusOne;
    });
    this.page = this.pageEnum[6];
    this.pageAnimation = true;
  }

  onSubmit() {
    this.rsvpLists.group.forEach((invitee: any) => {
      invitee[7] = this.songRequest;
      invitee[8] = 'submitted'
    });
    this.sheetService.postInviteInfo(this.rsvpLists).subscribe((data: any) => {
      this.page = this.pageEnum[7];
      this.pageAnimation = true;
    }, err => {
      console.log(err);
    });
  }

}
