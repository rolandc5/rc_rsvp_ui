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
    })
  }

  onSubmit() {
    this.rsvpLists.group.forEach((invitee: any) => {
      invitee[7] = this.songRequest;
      invitee[8] = 'submitted'
    });
    this.sheetService.postInviteInfo().subscribe({
      error: (err) => {
        this.error = err;
      },
      complete: () => {
        this.pageOutput.emit(7);
      }
    })
  }

}
