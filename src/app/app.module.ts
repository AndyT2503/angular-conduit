import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HeaderComponent } from './core/layout/header/header.component';

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
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabledBlocking',
    }),
  ],
})
export class AppModule {}
