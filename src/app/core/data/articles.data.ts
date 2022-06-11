import { Article } from '../models/article.model';

export const GlobalArticles: Article[] = [
  {
    content:
      'Share your knowledge and enpower the community by creating a new implementation',
    creationTime: new Date(),
    slug: 'Create-a-new-implementation',
    tags: ['implementations'],
    title: 'Create a new implementation',
    username: 'Gerome',
  },
  {
    content:
      'Over 100 implementations have been created using various languages, libraries, and frameworks.',
    creationTime: new Date(),
    slug: 'Explore-implementations',
    tags: ['implementations', 'codebaseShow'],
    title: 'Explore implementations',
    username: 'Gerome',
  },
  {
    content:
      'See how the exact same Medium.com clone (called Conduit) is built using different frontends and backends. Yes, you can mix and match them, because they all adhere to the same API spec',
    creationTime: new Date(),
    slug: 'Welcome-to-RealWorld-project',
    tags: ['welcome', 'introduction'],
    title: 'Welcome to RealWorld project',
    username: 'Gerome',
  },
];
