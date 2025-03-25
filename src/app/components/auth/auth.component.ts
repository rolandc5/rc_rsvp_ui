import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimaryService } from '../../services/primary.service';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.password = this.route.snapshot.queryParamMap.get('password');
    this.primaryService.login(this.password);
  }

  onSubmitPassword() {
    this.router.navigate([], { queryParams: { password: this.password } })
    this.primaryService.login(this.password);
  }
}

