import { environment } from 'src/environments/environment';
import { Seo } from '../models';

export const editorSeo: Seo = {
  metaDefinition: [
    {
      name: 'title',
      content: 'Editor - Conduit',
    },
    {
      name: 'description',
      content: `Create new article to share everything you want`,
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:title',
      content: 'Editor - Conduit',
    },
    {
      name: 'twitter:description',
      content: `Create new article to share everything you want`,
    },
    {
      property: 'og:title',
      content: 'Editor - Conduit',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: environment.appDomain + '/#/editor',
    },
    {
      property: 'og:description',
      content: `Create new article to share everything you want`,
    },
  ],
};
