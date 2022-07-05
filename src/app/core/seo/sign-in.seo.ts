import { environment } from 'src/environments/environment';
import { Seo } from '../models';
export const signInSeo: Seo = {
  metaDefinition: [
    {
      name: 'title',
      content: 'Sign in - Conduit',
    },
    {
      name: 'description',
      content: `Login to your Real World Conduits' account to use all functions`,
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:title',
      content: 'Sign in - Conduit',
    },
    {
      name: 'twitter:description',
      content: `Login to your Real World Conduits' account to use all functions`,
    },
    {
      property: 'og:title',
      content: 'Sign in - Conduit',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: environment.appDomain + '/#/login',
    },
    {
      property: 'og:description',
      content: `Login to your Real World Conduits' account to use all functions`,
    },
  ],
};
