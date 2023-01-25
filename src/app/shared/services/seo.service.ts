import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';
import { Seo } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private metaElements: HTMLMetaElement[] = [];
  private readonly meta = inject(Meta);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  loadSeoData() {
    return this.router.events.pipe(
      filter((val) => val instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      switchMap((route) => route.data),
      tap((res) => {
        const seoData = res as Seo;
        if (seoData.metaDefinition) {
          this.setMetaTags(seoData.metaDefinition);
        }
      })
    );
  }

  setMetaTags(tags: MetaDefinition[]): void {
    this.metaElements.forEach((el) => this.meta.removeTagElement(el));
    this.metaElements = this.meta.addTags(tags, false);
  }
}
