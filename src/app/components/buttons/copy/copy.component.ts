import {Component, inject, Input} from '@angular/core';
import {IconComponent} from '../../icon/icon.component';
import {GradientService} from '../../../services/gradient.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-copy',
  standalone: true,
  imports: [
    IconComponent,
    NgClass
  ],
  templateUrl: './copy.component.html',
  styleUrl: './copy.component.css'
})
export class CopyComponent {
  @Input() text!: string;
  @Input() xsButton: boolean = false;
  public copySuccess: boolean = false;
  private gradientService: GradientService = inject(GradientService);


  public copyText() {
    this.gradientService.copyText(this.text).then(() => {
      this.copySuccess = true;
      setTimeout(() => {
        this.copySuccess = false;
      }, 1500);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    })
  }
}
