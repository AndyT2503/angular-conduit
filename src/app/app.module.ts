import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, TitleStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { SeoService, TitleStrategyService } from './shared/services';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    HeaderComponent,
    RouterModule,
    FooterComponent,
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'top',
      useHash: true,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector) => () => {
        const seoService = injector.get(SeoService);
        return seoService.loadSeoData().subscribe();
      },
      deps: [Injector],
      multi: true,
    },
    {
      provide: TitleStrategy,
      useClass: TitleStrategyService,
    },
  ],
})
export class AppModule {}
