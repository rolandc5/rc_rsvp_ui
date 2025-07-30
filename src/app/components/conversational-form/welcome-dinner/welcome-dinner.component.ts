import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { PackagesModule } from '../../../modules/packages.module';
import { Rsvp } from '../../../models/rsvp';
import { SheetsService } from '../../../services/sheets.service';

@Component({
  selector: 'welcome-dinner',
  standalone: true,
  imports: [PackagesModule],
  templateUrl: './welcome-dinner.component.html',
  styleUrl: './welcome-dinner.component.scss'
})
export class WelcomeDinnerComponent {
  @Output() pageOutput = new EventEmitter<number>();
  sheetService = inject(SheetsService);
  rsvpLists: Rsvp = {} as Rsvp;
  joinUs: string = '';

  constructor() {
    effect(() => {
      this.rsvpLists = this.sheetService.rsvp;
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

  welcomeDinnerSubmit() {
    this.rsvpLists.group.forEach((invitee: any) => {
      invitee[6] = this.joinUs;
    });
    this.sheetService._rsvp.set(this.rsvpLists);
    this.pageOutput.emit(6);
  }
}
