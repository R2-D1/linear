import {Component, inject, OnInit} from '@angular/core';
import {IconComponent} from "../icon/icon.component";
import {Gradient} from "../../models/gradient.model";
import {GradientService} from "../../services/gradient.service";

@Component({
  selector: 'app-full-preview',
  standalone: true,
  imports: [
    IconComponent
  ],
  templateUrl: './full-preview.component.html',
  styleUrl: './full-preview.component.css'
})
export class FullPreviewComponent implements OnInit {
  public gradient: Gradient | undefined;
  private gradientService = inject(GradientService);
  public currentGradientIndex: number = 0;
  public gradientsLength: number = 0;


  ngOnInit() {
    this.subscribeOnGradientChange();
    this.subscribeOnGradientsLengthChange();
  }

  public copyText() {
    if (this.gradient) {
      this.gradientService.copyText(this.gradient.code);
    }
  }

  public hideFullPreview() {
    this.gradientService.hideFullPreview();
  }

  public nextGradient(): undefined {
    this.gradientService.nextGradientForPreview();
  }

  public previousGradient(): undefined {
    this.gradientService.previousGradientForPreview();
  }

  private subscribeOnGradientChange() {
    this.gradientService.changeFullPreviewGradient$.subscribe({
      next: gradient => {
        this.gradient = gradient;
        this.currentGradientIndex = this.gradientService.gradientForPreviewIndex;
      }
    });
  }

  private subscribeOnGradientsLengthChange() {
    this.gradientService.changeGradientsLengthSubject$.subscribe({
      next: length => {
        this.gradientsLength = length;
        this.currentGradientIndex = this.gradientService.gradientForPreviewIndex;
      }
    });
  }
}
