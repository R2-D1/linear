import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, Subject} from 'rxjs';
import {Gradient} from '../models/gradient.model';
import {FilterData} from '../models/filter.form';

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

  constructor() {
  }

  public getGradients() {
    return this.http.get<Gradient[]>('/assets/db.json').pipe(map((data) => {
      this.gradients = data;
      this.initLikedGradients();
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

  public async copyText(text: string): Promise<void> {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  }

  public nextGradientForPreview(): undefined {
    if (this.gradientForPreviewIndex < this.gradients.length - 1) {
      this.gradientForPreviewIndex++;
    } else {
      this.gradientForPreviewIndex = 0;
    }


    this.gradientForPreview = this.gradients[this.gradientForPreviewIndex];
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

  public like(gradient: Gradient): undefined {
    gradient.liked = true;
    let likedGradients: string[];
    const likedGradientsStr = localStorage.getItem('likedGradients');

    if (likedGradientsStr) {
      likedGradients = JSON.parse(likedGradientsStr);
      if (likedGradients.includes(gradient.name)) {
        return;
      }

      likedGradients.push(gradient.name);
    } else {
      likedGradients = [gradient.name];
    }

    localStorage.setItem('likedGradients', JSON.stringify(likedGradients));
  }

  public dislike(gradient: Gradient): undefined {
    gradient.liked = false;
    let likedGradients: string[];
    const likedGradientsStr = localStorage.getItem('likedGradients');

    if (likedGradientsStr) {
      likedGradients = JSON.parse(likedGradientsStr);
      const likedGradientIndex = likedGradients.findIndex((name) => name == gradient.name);
      if (likedGradientIndex) {
        likedGradients.splice(likedGradientIndex, 1);
      } else {
        return;
      }

      localStorage.setItem('likedGradients', JSON.stringify(likedGradients));
    }
  }

  public filterGradients(filter: FilterData): Gradient[] {
    return this.gradients.filter(gradient => {
      if (filter.name && !gradient.name.toLowerCase().includes(filter.name.toLowerCase())) {
        return false;
      }

      if (filter.color && !gradient.tags.some(tag => tag.includes(filter.color || ''))) {
        return false;
      }

      return true;
    });
  }

  private initLikedGradients(): undefined {
    const likedGradientsStr = localStorage.getItem('likedGradients');
    if (likedGradientsStr) {
      const likedGradients = JSON.parse(likedGradientsStr);
      this.gradients.forEach(gradient => {
        if (likedGradients.includes(gradient.name)) {
          gradient.liked = true;
        }
      });
    }
  }
}
