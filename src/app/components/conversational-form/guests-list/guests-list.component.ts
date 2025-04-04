import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { PackagesModule } from '../../../modules/packages.module';
import { Rsvp } from '../../../models/rsvp';
import { SheetsService } from '../../../services/sheets.service';

@Component({
  selector: 'guests-list',
  standalone: true,
  imports: [PackagesModule],
  templateUrl: './guests-list.component.html',
  styleUrl: './guests-list.component.scss'
})
export class GuestsListComponent {
  @Output() pageOutput = new EventEmitter<number>();
  sheetService = inject(SheetsService);
  rsvpLists: Rsvp = {} as Rsvp;

  constructor() {
    effect(() => {
      this.rsvpLists = this.sheetService.rsvp;
    })
  }

  selectedInvitee(e: Event, arrIndex: number) {
    const selectedRadio = (e.target as HTMLInputElement).id
    if (selectedRadio === `attending${arrIndex}`) {
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
    this.sheetService._rsvp.set(this.rsvpLists);
    this.pageOutput.emit(4);
  }

}
