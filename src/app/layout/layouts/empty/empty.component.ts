import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { SharedModule } from '@shared/shared.module';
import { Subject } from 'rxjs';

@Component({
  standalone: true,
  selector: 'empty-layout',
  templateUrl: './empty.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [RouterModule, FuseLoadingBarModule, SharedModule],
})
export class EmptyLayoutComponent implements OnDestroy {
  private _unsubscribeAll: Subject<boolean> = new Subject<boolean>();

  /**
   * Constructor
   */

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
