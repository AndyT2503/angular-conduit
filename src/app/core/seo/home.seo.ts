import { Seo } from '../models';

export const homeSeo: Seo = {
  title: 'Home - Conduit',
  metaDefinition: [
    {
      name: 'title',
      content: 'Home - Conduit',
    },
    {
      name: 'description',
      content: 'This is the Medium Cloning Page was built by Angular',
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:title',
      content: 'Home - Conduit',
    },
    {
      name: 'twitter:description',
      content: `This is the Medium Cloning Page was built by Angular`,
    },
    {
      property: 'og:title',
      content: 'Home - Conduit',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: window.location.origin + '/#/',
    },
    {
      property: 'og:description',
      content: 'This is the Medium Cloning Page was built by Angular',
    },
  ],
};
