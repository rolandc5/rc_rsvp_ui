import { Component, inject, effect } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { SearchRsvpComponent } from '../conversational-form/search-rsvp/search-rsvp.component';
import { SheetsService } from '../../services/sheets.service';
import { Rsvp } from '../../models/rsvp';
import { GuestsListComponent } from '../conversational-form/guests-list/guests-list.component';
import { AllergiesComponent } from '../conversational-form/allergies/allergies.component';
import { PlusOneComponent } from '../conversational-form/plus-one/plus-one.component';
import { SongRequestComponent } from '../conversational-form/song-request/song-request.component';
import { ThankYouComponent } from '../conversational-form/thank-you/thank-you.component';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [ReactiveFormsModule, SearchRsvpComponent, GuestsListComponent, AllergiesComponent, PlusOneComponent, SongRequestComponent, ThankYouComponent],
  templateUrl: './rsvp.component.html',
  styleUrl: './rsvp.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, }),
        animate('500ms', style({ opacity: 1, }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, }))
      ])
    ])
  ]
})
export class RsvpComponent {
  pageAnimation: boolean = false;
  pageEnum: Record<number, string> = {
    1: 'find',
    2: 'confirmed',
    3: 'invitation',
    4: 'allergy',
    5: 'plus1',
    6: 'songRequest',
    7: 'thankyou',
    8: 'none'
  }
  page: string = this.pageEnum[1];

  onLeaveAnimationDone(e: any) {
    if (e.toState === 'void') {
      setTimeout(() => {
        this.pageAnimation = false;
      }, 320)
    }
  }

  curPage(page: number) {
    this.page = this.pageEnum[page];
    this.pageAnimation = true;
  }
}
