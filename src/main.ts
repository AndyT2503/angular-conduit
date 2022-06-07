import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./app/features/sign-in/sign-in.component').then(c => c.SignInComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./app/features/sign-up/sign-up.component').then(c => c.SignUpComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./app/features/setting/setting.component').then(c => c.SettingComponent)
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'top',
      }),
      HttpClientModule,
      BrowserAnimationsModule,
      BrowserModule
    ),
  ],
}).catch((err) => console.error(err));
