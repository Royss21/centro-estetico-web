import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, of, takeUntil } from 'rxjs';
import { User } from '@core/user/user.types';
import { UserService } from '@core/user/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@shared/shared.module';

@Component({
  standalone: true,
  selector: 'user',
  templateUrl: './user.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'user',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    SharedModule
  ]
})
export class UserComponent implements OnInit, OnDestroy {
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_showAvatar: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() showAvatar: boolean = true;
  user: User;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _userService: UserService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to user changes
    // this._userService.user$
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((user: User) => {
    //     this.user = user;

    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    //   });

    var user: User = {
      id: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
      name: 'Brian Hughes',
      email: 'hughes.brian@company.com',
      avatar: 'assets/images/avatars/brian-hughes.jpg',
      status: 'online'
    };

    of(user).subscribe((user: User) => {
      console.log('user', user)
      this.user = user;
      this._changeDetectorRef.markForCheck();
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Update the user status
   *
   * @param status
   */
  updateUserStatus(status: string): void {
    // Return if user is not available
    if (!this.user) return;

    // Update the user
    this._userService
      .update({
        ...this.user,
        status
      })
      .subscribe();
  }

  /**
   * Sign out
   */
  signOut(): void {
    this._router.navigate(['/sign-in']);
  }
}
