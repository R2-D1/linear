import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GradientService} from "../../services/gradient.service";
import {Gradient} from "../../models/gradient.model";
import {GradientComponent} from "../gradient/gradient.component";
import {HeroComponent} from "../hero/hero.component";
import {FullPreviewComponent} from "../full-preview/full-preview.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, GradientComponent, FullPreviewComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private gradientService = inject(GradientService);
  public gradients: Gradient[] | null = null;
  ngOnInit() {
    this.gradientService.getGradients().subscribe({
      next: data => {
        this.gradients = data;
        this.gradientService.gradients = data;
        console.log(this.gradients);
      }
    })
  }
}
