import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  standalone: true,
  styleUrls: ['./theme-switcher.component.css'],
})
export class ThemeSwitcherComponent implements OnInit, OnDestroy {
  public currentTheme!: string;
  private colorSchemeQueryList!: MediaQueryList;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.currentTheme = this.themeService.loadTheme();
    this.colorSchemeQueryList = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    this.colorSchemeQueryList.addListener(this.colorSchemeChanged.bind(this));
  }

  ngOnDestroy() {
    this.colorSchemeQueryList.removeListener(
      this.colorSchemeChanged.bind(this)
    );
  }

  public setLightTheme() {
    this.themeService.setLightTheme();
    this.currentTheme = 'light';
  }

  public setDarkTheme() {
    this.themeService.setDarkTheme();
    this.currentTheme = 'dark';
  }

  public setAutoTheme() {
    this.themeService.setAutoTheme();
    this.currentTheme = 'auto';
  }

  private colorSchemeChanged() {
    if (this.currentTheme === 'auto') {
      this.setAutoTheme();
    }
  }
}
