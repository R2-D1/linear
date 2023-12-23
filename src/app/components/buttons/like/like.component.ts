import { Component, inject, Input } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { Gradient } from '../../../models/gradient.model';
import { GradientService } from '../../../services/gradient.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [IconComponent, NgClass],
  templateUrl: './like.component.html',
  styleUrl: './like.component.css',
})
export class LikeComponent {
  @Input() gradient!: Gradient;
  private gradientService: GradientService = inject(GradientService);

  public like() {
    if (this.gradient.liked) {
      this.gradientService.dislike(this.gradient);
    } else {
      this.gradientService.like(this.gradient);
    }
  }
}
