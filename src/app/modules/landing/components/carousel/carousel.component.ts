import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ICarouselItem } from '@modules/landing/components/carousel/interfaces';
import { SharedModule } from '@shared/shared.module';
import { Subject, interval, takeUntil, timeInterval } from 'rxjs';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() height: number = 500;
  @Input() isFullScreen: boolean = false;
  @Input() items: ICarouselItem[] = [];

  finalHeight: string | number = 0;
  currentPosition: number = 0;

  destroyed$ = new Subject();
  private _timeInterval = interval(5000);

  constructor() {
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
  }

  ngOnInit(): void {
    this._timeInterval
      .pipe(takeUntil(this.destroyed$), timeInterval())
      .subscribe(() => this.setNext());

    this.items.map((item, i) => {
      item.id = i;
      item.marginLeft = 0;
    });
  }

  setCurrentPosition(position: number): void {
    this.currentPosition = position;
    this.items.find((i) => i.id === 0).marginLeft = -100 * position;
  }

  setNext(): void {
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;

    if (nextPosition <= this.items.length - 1)
      finalPercentage = -100 * nextPosition;
    else nextPosition = 0;

    this.items.find((i) => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
  }

  setBack(): void {
    let finalPercentage = 0;
    let backPosition =
      (this.currentPosition < 0 ? 1 : this.currentPosition) - 1;

    if (backPosition >= 0) finalPercentage = -100 * backPosition;
    else {
      finalPercentage = 100 * backPosition;
      backPosition = this.items.length - 1;
    }

    this.items.find((i) => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = backPosition;
  }

  ngOnDestroy() {
    this.destroyed$.next(null);
  }
}
