import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ExtraOptions, PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading, withRouterConfig } from '@angular/router';
import { appRoutes } from './app/app.routing'
import { appConfig } from '@core/config/app.config';
import { FuseConfigModule } from '@fuse/services/config';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuseModule } from './@fuse';
import { AppComponent } from './app/app.component';
import { IconsModule } from '@core/icons/icons.module';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};

bootstrapApplication(AppComponent, {
  providers:[
    provideRouter(
      appRoutes,
      withInMemoryScrolling(routerConfig)
    ),
    importProvidersFrom(
      BrowserAnimationsModule,
      BrowserModule,

      FuseConfigModule.forRoot(appConfig),
      FuseModule,

      IconsModule,
      HttpClientModule
    )
  ]
}).catch(err => console.error(err));
