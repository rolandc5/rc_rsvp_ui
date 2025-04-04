import { Component, inject, Output, EventEmitter } from '@angular/core';
import { SheetsService } from '../../../services/sheets.service';
import { PackagesModule } from '../../../modules/packages.module';
import { Rsvp } from '../../../models/rsvp';

@Component({
  selector: 'search-rsvp',
  standalone: true,
  imports: [PackagesModule],
  templateUrl: './search-rsvp.component.html',
  styleUrl: './search-rsvp.component.scss'
})
export class SearchRsvpComponent {
  @Output() pageOutput = new EventEmitter<number>();
  sheetService = inject(SheetsService);
  name: string = '';
  searchError: boolean = false;

  searchInviteInfo() {
    this.sheetService.getInviteInfo(this.name).subscribe(
      {
        error: () => {
          this.searchError = true;
        },
        complete: () => {
          this.pageOutput.emit(3);
          this.searchError = false;
        }
      }
    )
  }
}
