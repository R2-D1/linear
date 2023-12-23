import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gradient } from '../../models/gradient.model';
import { IconComponent } from '../icon/icon.component';
import { FullPreviewComponent } from '../full-preview/full-preview.component';
import { GradientService } from '../../services/gradient.service';
import { CopyComponent } from '../buttons/copy/copy.component';
import { LikeComponent } from '../buttons/like/like.component';

@Component({
  selector: 'app-gradient',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    FullPreviewComponent,
    CopyComponent,
    LikeComponent,
  ],
  templateUrl: './gradient.component.html',
  styleUrls: ['./gradient.component.css'],
})
export class GradientComponent {
  @Input() gradient!: Gradient;
  private gradientService: GradientService = inject(GradientService);

  public showFullPreview() {
    this.gradientService.showFullPreview(this.gradient);
  }
}
