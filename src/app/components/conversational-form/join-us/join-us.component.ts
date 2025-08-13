import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { PackagesModule } from '../../../modules/packages.module';
import { Rsvp } from '../../../models/rsvp';
import { SheetsService } from '../../../services/sheets.service';

@Component({
  selector: 'join-us',
  standalone: true,
  imports: [PackagesModule],
  templateUrl: './join-us.component.html',
  styleUrl: './join-us.component.scss'
})
export class JoinUsComponent {
  @Output() pageOutput = new EventEmitter<number>();
  sheetService = inject(SheetsService);
  rsvpLists: Rsvp = {} as Rsvp;
  joinUs: string = '';
  email: string = '';
  guests: any;
  inputError: boolean = false;

  constructor() {
    effect(() => {
      this.rsvpLists = this.sheetService.rsvp;
      this.joinUs = this.rsvpLists.group[0][10];
      this.guests = this.rsvpLists.group[0][11];
    })
  }

  radioSelect(e: Event) {
    const selectedRadio = (e.target as HTMLInputElement).id;
    if (selectedRadio === 'interested') {
      this.joinUs = 'yes';
    } else if (selectedRadio === 'not-interested') {
      this.joinUs = 'no';
    }
  }

  joinUsSubmit() {
    if (this.joinUs === 'yes' && !this.guests) {
      this.inputError = true;
      return;
    }
    console.log(this.rsvpLists);
    this.rsvpLists.group.forEach((invitee: any) => {
      invitee[10] = this.joinUs;
      invitee[10] = this.guests;
    });
    this.sheetService._rsvp.set(this.rsvpLists);
    this.pageOutput.emit(9);
  }
}
