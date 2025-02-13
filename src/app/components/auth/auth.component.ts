import { Component, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimaryService } from '../../services/primary.service';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  primaryService = inject(PrimaryService);
  password: string | null = '';
  auth: boolean = false;


  constructor(private route: ActivatedRoute) {
    this.password = this.route.snapshot.paramMap.get('password');
  }

  onSubmitPassword() {
    this.primaryService.login(this.password);
  }
}

