import { Injectable, inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";
import {Gradient} from "../models/gradient.model";

@Injectable({
  providedIn: 'root',
})
export class GradientService {
  public gradientForPreview: Gradient | undefined;
  public gradients: Gradient[] = [];
  public gradientForPreviewIndex: number = 0;
  private changeGradientForPreviewSubject = new Subject<Gradient | undefined>();
  private changeGradientsLengthSubject = new Subject<number>();

  private http: HttpClient = inject(HttpClient);
  constructor() {}

  public getGradients() {
    return this.http.get<Gradient[]>('/assets/db.json').pipe(map((data) => {
      this.gradients = data;
      this.onChangeGradientsLength$(this.gradients.length);
      return this.gradients;
    }));
  }

  public showFullPreview(gradient?: Gradient): undefined {
    if (gradient) {
      this.gradientForPreview = gradient;
    }

    this.onChangeFullPreviewGradient$(this.gradientForPreview);
  }

  public hideFullPreview() {
    this.gradientForPreview = undefined;
    this.onChangeFullPreviewGradient$();
  }

  public get changeFullPreviewGradient$(): Observable<Gradient | undefined> {
    return this.changeGradientForPreviewSubject.asObservable();
  }

  public get changeGradientsLengthSubject$(): Observable<number> {
    return this.changeGradientsLengthSubject.asObservable();
  }

  private onChangeGradientsLength$(length: number): undefined {
    this.changeGradientsLengthSubject.next(length);
  }

  public copyText(text: string): undefined {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    });
  }

  public nextGradientForPreview(): undefined {
    if (this.gradientForPreviewIndex < this.gradients.length - 1) {
      this.gradientForPreviewIndex++;
    } else {
      this.gradientForPreviewIndex = 0;
    }

    console.log(this.gradientForPreviewIndex);

    this.gradientForPreview = this.gradients[this.gradientForPreviewIndex];
    console.log(this.gradientForPreview);
    this.onChangeFullPreviewGradient$(this.gradientForPreview);
  }

  public previousGradientForPreview(): undefined {
    if (this.gradientForPreviewIndex > 0) {
      this.gradientForPreviewIndex--;
    } else {
      this.gradientForPreviewIndex = this.gradients.length - 1;
    }

    this.gradientForPreview = this.gradients[this.gradientForPreviewIndex];
    this.onChangeFullPreviewGradient$(this.gradientForPreview);
  }

  private onChangeFullPreviewGradient$(department: Gradient | void): undefined {
    this.setGradientForPreviewIndex();
    this.changeGradientForPreviewSubject.next(department || undefined);
  }

  private setGradientForPreviewIndex(): undefined {
    if (this.gradientForPreview) {
      this.gradientForPreviewIndex = this.gradients.indexOf(this.gradientForPreview);
    }
  }
}
