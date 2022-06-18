import { CommonModule } from '@angular/common';
import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HeaderComponent } from './core/layout/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule, FooterComponent]
})
export class AppComponent {

  static bootstrap() {
    bootstrapApplication(this, {
      providers: [
        importProvidersFrom(
          RouterModule.forRoot(appRoutes, {
            scrollPositionRestoration: 'top',
            useHash: true,
            preloadingStrategy: PreloadAllModules
          }),
        ),
      ],
    }).catch((err) => console.error(err));
  }
}
