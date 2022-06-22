import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { SeoService } from './shared/services/seo.service';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'real-world-conduit' }),
    HeaderComponent,
    RouterModule,
    FooterComponent,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'top',
      useHash: true,
      initialNavigation: 'enabledBlocking',
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (seoService: SeoService) => () => {
        return seoService.loadSeoData().subscribe();
      },
      deps: [SeoService],
      multi: true,
    },
  ],
})
export class AppModule {}
