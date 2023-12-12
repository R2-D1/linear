import {Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Gradient} from "../../models/gradient.model";
import {IconComponent} from "../icon/icon.component";
import {FullPreviewComponent} from "../full-preview/full-preview.component";
import {GradientService} from "../../services/gradient.service";

@Component({
  selector: 'app-gradient',
  standalone: true,
  imports: [CommonModule, IconComponent, FullPreviewComponent],
  templateUrl: './gradient.component.html',
  styleUrls: ['./gradient.component.css']
})
export class GradientComponent {
  @Input() gradient!: Gradient;

  public isDialogOpen = false;

  private gradientService: GradientService = inject(GradientService);

  public showFullPreview() {
    this.gradientService.showFullPreview(this.gradient);
  }

  public hideFullPreview() {
    this.isDialogOpen = false;
  }

  public copyText() {
    navigator.clipboard.writeText(this.gradient.code).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }
}
