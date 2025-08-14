import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { PackagesModule } from '../../../modules/packages.module';
import { Rsvp } from '../../../models/rsvp';
import { SheetsService } from '../../../services/sheets.service';

@Component({
  selector: 'song-request',
  standalone: true,
  imports: [PackagesModule],
  templateUrl: './song-request.component.html',
  styleUrl: './song-request.component.scss'
})
export class SongRequestComponent {
  @Output() pageOutput = new EventEmitter<number>();
  sheetService = inject(SheetsService);
  rsvpLists: Rsvp = {} as Rsvp;
  songRequest: string = '';
  error: string = '';

  constructor() {
    effect(() => {
      this.rsvpLists = this.sheetService.rsvp;
      this.songRequest = this.rsvpLists.group[0][7];
    })
  }

  onSubmit() {
    this.rsvpLists.group.forEach((invitee: any) => {
      invitee[7] = this.songRequest;
      invitee[8] = 'submitted'
    });
    this.sheetService._rsvp.set(this.rsvpLists);
    this.pageOutput.emit(7);
  }

}
