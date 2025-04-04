import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { PackagesModule } from '../../../modules/packages.module';
import { Rsvp } from '../../../models/rsvp';
import { SheetsService } from '../../../services/sheets.service';

@Component({
  selector: 'plus-one',
  standalone: true,
  imports: [PackagesModule],
  templateUrl: './plus-one.component.html',
  styleUrl: './plus-one.component.scss'
})
export class PlusOneComponent {
  @Output() pageOutput = new EventEmitter<number>();
  sheetService = inject(SheetsService);
  rsvpLists: Rsvp = {} as Rsvp;
  plusOne: string = '';

  constructor() {
    effect(() => {
      this.rsvpLists = this.sheetService.rsvp;
    })
  }

  radioSelect(e: Event) {
    const selectedRadio = (e.target as HTMLInputElement).id;
    if (selectedRadio === 'interested') {
      this.plusOne = 'yes';
    } else if (selectedRadio === 'not-interested') {
      this.plusOne = 'no';
    }
  }

  plusOneSubmit() {
    this.rsvpLists.group.forEach((invitee: any) => {
      invitee[6] = this.plusOne;
    });
    this.sheetService._rsvp.set(this.rsvpLists);
    this.pageOutput.emit(6);
  }
}
