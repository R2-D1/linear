import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  setLightTheme() {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }

  setDarkTheme() {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
  }

  setAutoTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
    localStorage.removeItem('theme');
  }

  loadTheme(): string {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      this.setDarkTheme();
      return 'dark';
    } else if (storedTheme === 'light') {
      this.setLightTheme();
      return 'light';
    } else {
      this.setAutoTheme();
      return 'auto';
    }
  }
}
