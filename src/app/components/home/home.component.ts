import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {GradientService} from '../../services/gradient.service';
import {Gradient} from '../../models/gradient.model';
import {GradientComponent} from '../gradient/gradient.component';
import {HeroComponent} from '../hero/hero.component';
import {FullPreviewComponent} from '../full-preview/full-preview.component';
import {FilterComponent} from '../filter/filter.component';
import {FilterData} from '../../models/filter.form';
import {HeaderComponent} from '../header/header.component';
import {IconComponent} from '../icon/icon.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, GradientComponent, FullPreviewComponent, FilterComponent, HeaderComponent, IconComponent, NgOptimizedImage, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private gradientService = inject(GradientService);
  public gradients: Gradient[] | null = null;

  public ngOnInit() : undefined {
    this.gradientService.getGradients().subscribe({
      next: data => {
        this.gradients = data;
        this.gradientService.gradients = data;
      }
    })
  }

  public onFilterChanged(filter: FilterData): undefined {
    this.gradients = this.gradientService.filterGradients(filter);
  }
}
