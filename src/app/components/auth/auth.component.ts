import { Component, inject, OnInit } from '@angular/core';
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
export class AuthComponent implements OnInit {
  primaryService = inject(PrimaryService);
  password: string | null = '';

  constructor(private route: ActivatedRoute) {
    this.password = this.route.snapshot.queryParamMap.get('password');
  }

  ngOnInit() {    
    this.primaryService.login(this.password)
  }

  onSubmitPassword() {
    this.primaryService.login(this.password);
  }
}

