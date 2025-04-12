import { Component } from '@angular/core';
import { PackagesModule } from '../../modules/packages.module';

@Component({
  selector: 'r-header',
  standalone: true,
  imports: [PackagesModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  navMenuPopup: boolean = false;
}
