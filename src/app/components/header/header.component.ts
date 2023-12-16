import { Component } from '@angular/core';
import {ThemeSwitcherComponent} from "../theme-switcher/theme-switcher.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ThemeSwitcherComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
