import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gradient } from '../../models/gradient.model';
import { IconComponent } from '../icon/icon.component';
import { FullPreviewComponent } from '../full-preview/full-preview.component';
import { GradientService } from '../../services/gradient.service';
import { CopyComponent } from '../buttons/copy/copy.component';

@Component({
  selector: 'app-gradient',
  standalone: true,
  imports: [CommonModule, IconComponent, FullPreviewComponent, CopyComponent],
  templateUrl: './gradient.component.html',
  styleUrls: ['./gradient.component.css'],
})
export class GradientComponent {
  @Input() gradient!: Gradient;
  private gradientService: GradientService = inject(GradientService);

  public showFullPreview() {
    this.gradientService.showFullPreview(this.gradient);
  }

  // public copyText() {
  //   navigator.clipboard.writeText(this.gradient.code).then(() => {
  //     console.log('Text copied to clipboard');
  //   }).catch(err => {
  //     console.error('Failed to copy text: ', err);
  //   });
  // }

  public like() {
    if (this.gradient.liked) {
      this.gradientService.dislike(this.gradient);
    } else {
      this.gradientService.like(this.gradient);
    }
  }
}
