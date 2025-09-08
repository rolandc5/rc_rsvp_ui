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
  guests: number = 0;
  inputError: boolean = false;
  error: string = '';

  constructor() {
    effect(() => {
      this.rsvpLists = this.sheetService.rsvp;
      console.log(this.rsvpLists);
      this.joinUs = this.rsvpLists.group[0][10];
      this.guests = this.rsvpLists.group[0][11];
      console.log(this.joinUs, this.guests);
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
    this.rsvpLists.group.forEach((invitee: any) => {
      invitee[10] = this.joinUs;
      invitee[11] = this.guests;
    });
    this.sheetService.postInviteInfo().subscribe({
      error: (err) => {
        this.error = err;
      },
      complete: () => {
        this.pageOutput.emit(9);
      }
    })
  }
}
