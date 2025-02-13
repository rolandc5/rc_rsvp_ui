import { Component, inject, effect } from '@angular/core';
import { RFormComponent } from '../r-form/r-form.component';
import { AuthComponent } from '../auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms'
import { PrimaryService } from '../../services/primary.service';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [RFormComponent, AuthComponent, ReactiveFormsModule],
  templateUrl: './rsvp.component.html',
  styleUrl: './rsvp.component.scss',
})
export class RsvpComponent {
  primaryService = inject(PrimaryService);
  auth: boolean = false;

  constructor() {
    effect(() => {
      this.auth = this.primaryService.auth();
    })
  }
}
