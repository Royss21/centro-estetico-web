import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
  FuseNavigationService,
  FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { Navigation } from '@core/navigation/navigation.types';
import { NavigationService } from '@core/navigation/navigation.service';
import { User } from '@core/user/user.types';
import { UserService } from '@core/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseFullscreenModule } from '@fuse/components/fullscreen/fullscreen.module';
import { SharedModule } from '@shared/shared.module';
import { NotificationsComponent } from '@layout/common/notifications/notifications.component';
import { UserComponent } from '@layout/common/user/user.component';

@Component({
  standalone: true,
  selector: 'classy-layout',
  templateUrl: './classy.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    FuseFullscreenModule,
    FuseLoadingBarModule,
    FuseNavigationModule,
    SharedModule,

    ClassyLayoutComponent,
    NotificationsComponent,
    UserComponent,
  ],
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
  isScreenSmall: boolean = false;
  navigation: Navigation;
  user: User;
  private _unsubscribeAll: Subject<boolean> = new Subject<boolean>();

  @ViewChild('bannerHeader', { static: false })
  bannerHeader: ElementRef<HTMLDivElement>;
  @ViewChild('bannerHeaderMovile', { static: false })
  bannerHeaderMovile: ElementRef<HTMLDivElement>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _navigationService: NavigationService,
    private _userService: UserService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseNavigationService: FuseNavigationService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to navigation data

    const navi: Navigation = {
      default: [
        {
          id: 'home',
          title: 'Inicio',
          type: 'basic',
          icon: 'feather:home',
          link: '/',
        },
        {
          id: 'treatments',
          title: 'Tratamientos',
          type: 'basic',
          icon: 'feather:activity',
          link: '/caja',
        },
        {
          id: 'technologies',
          title: 'Tecnologías',
          type: 'basic',
          icon: 'feather:server',
          link: '/caja',
        },
        {
          id: 'promotions',
          title: 'Promociones',
          type: 'basic',
          icon: 'feather:gift',
          link: '/caja',
        },
        {
          id: 'products',
          title: 'Productos',
          type: 'basic',
          icon: 'feather:shopping-cart',
          link: '/caja',
        },
        // {
        //   id: 'sales',
        //   title: 'Ventas',
        //   type: 'collapsable',
        //   icon: 'heroicons_outline:chart-pie',
        //   children: [
        //     {
        //       id   : 'sales.pagedOrder',
        //       title: 'Listado de pedidos',
        //       type : 'basic',
        //       icon : 'heroicons_outline:clipboard-check',
        //       link : '/order',
        //       exactMatch: true
        //     },
        //     {
        //       id   : 'sales.createOrder',
        //       title: 'Crear Pedido',
        //       type : 'basic',
        //       icon : 'heroicons_outline:clipboard-check',
        //       link : '/order/create'
        //     },
        //     {
        //       id   : 'sales.registerSaleDay',
        //       title: 'Registrar venta del dia',
        //       type : 'basic',
        //       icon : 'heroicons_outline:clipboard-check',
        //       link : '/order/register-sale-day'
        //     },
        //   ]
        // }
      ],
    };

    of(navi).subscribe((navigation: Navigation) => {
      this.navigation = navigation;
    });

    // this._navigationService.navigation$
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((navigation: Navigation) => {
    //     console.log('navigation', navigation)
    //     this.navigation = navigation;
    //   });

    const user: User = {
      id: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
      name: 'Brian Hughes',
      email: 'hughes.brian@company.com',
      avatar: 'assets/images/avatars/brian-hughes.jpg',
      status: 'online',
    };

    of(user).subscribe((user: User) => {
      this.user = user;
    });

    // Subscribe to the user service
    // this._userService.user$
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((user: User) => {
    //     this.user = user;
    //   });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        console.log('scren', matchingAliases);
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
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
   * Toggle navigation
   *
   * @param name
   */
  toggleNavigation(name: string): void {
    // Get the navigation
    const navigation =
      this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
        name
      );

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }

  @HostListener('document:scroll', ['$event'])
  public onViewportScroll() {
    if (this.bannerHeader && !this.isScreenSmall) {
      this.bannerHeaderMovile.nativeElement.classList.remove(
        'fixed-banner-movile'
      );
      if (window.scrollY >= 100)
        this.bannerHeader.nativeElement.classList.add(
          'fixed',
          'top-0',
          'w-full'
        );
      else
        this.bannerHeader.nativeElement.classList.remove(
          'fixed',
          'top-0',
          'w-full'
        );
    }

    if (this.bannerHeaderMovile && this.isScreenSmall) {
      if (window.scrollY >= 50) {
        this.bannerHeaderMovile.nativeElement.classList.add(
          'fixed-banner-movile'
        );
        this.bannerHeaderMovile.nativeElement.classList.remove('relative');
      } else {
        this.bannerHeaderMovile.nativeElement.classList.remove(
          'fixed-banner-movile'
        );
        this.bannerHeaderMovile.nativeElement.classList.add('relative');
      }
    }
  }
}
