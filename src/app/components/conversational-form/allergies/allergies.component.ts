import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { PackagesModule } from '../../../modules/packages.module';
import { Rsvp } from '../../../models/rsvp';
import { SheetsService } from '../../../services/sheets.service';


@Component({
  selector: 'allergies',
  standalone: true,
  imports: [PackagesModule],
  templateUrl: './allergies.component.html',
  styleUrl: './allergies.component.scss'
})
export class AllergiesComponent {
  @Output() pageOutput = new EventEmitter<number>();
  sheetService = inject(SheetsService);
  rsvpLists: Rsvp = {} as Rsvp;
  allergy: string = '';

  constructor() {
    effect(() => {
      this.rsvpLists = this.sheetService.rsvp;
      this.allergy = this.rsvpLists.group[0][5];
    })
  }

  allergySubmit() {
    this.rsvpLists.group.forEach((invitee: any) => {
      invitee[5] = this.allergy;
    });
    this.sheetService._rsvp.set(this.rsvpLists);
    this.pageOutput.emit(5);
  }
}
