import { Seo } from '../models';
export const signUpSeo: Seo = {
  title: 'Sign up - Conduit',
  metaDefinition: [
    {
      name: 'title',
      content: 'Sign up - Conduit',
    },
    {
      name: 'description',
      content: `Register account to use all functions`,
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:title',
      content: 'Sign up - Conduit',
    },
    {
      name: 'twitter:description',
      content: `Register account to use all functions`,
    },
    {
      property: 'og:title',
      content: 'Sign up - Conduit',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: window.location.origin + '/#/register',
    },
    {
      property: 'og:description',
      content: `Register account to use all functions`,
    },
  ],
};
