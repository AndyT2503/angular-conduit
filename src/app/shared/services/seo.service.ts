import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private metaElements: HTMLMetaElement[] = [];
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);

  setMetaTags(tags: MetaDefinition[]): void {
    this.metaElements.forEach((el) => this.meta.removeTagElement(el));
    this.metaElements = this.meta.addTags(tags, false);
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }
}
