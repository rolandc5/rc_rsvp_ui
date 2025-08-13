import { Component, inject, Output, EventEmitter, OnInit } from '@angular/core';
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
export class SearchRsvpComponent implements OnInit {
  @Output() pageOutput = new EventEmitter<number>();
  sheetService = inject(SheetsService);
  name: string = '';
  searchError: boolean = false;

  ngOnInit(): void {
    //     this.sheetService.getInviteInfo('test test').subscribe(
    //   {
    //     error: () => {
    //       this.searchError = true;
    //     },
    //     complete: () => {
    //       this.pageOutput.emit(3);
    //       this.searchError = false;
    //     }
    //   }
    // )
  }

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
