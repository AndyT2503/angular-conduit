import { Injectable } from "@angular/core";
import { createStore, select, withProps } from "@ngneat/elf";
import { localStorageStrategy, persistState } from "@ngneat/elf-persist-state";
import { GlobalArticles } from "../data/articles.data";
import { Article } from "../models/article.model";

interface ArticleProps {
  articles: Article[] | null;
}

const articleStore = createStore(
  {name: 'article'},
  withProps<ArticleProps>({articles: GlobalArticles})
);

export const persist = persistState(articleStore, {
  key: 'article',
  storage: localStorageStrategy,
});

@Injectable({
  providedIn: 'root'
})
export class ArticleRepository {
  readonly articles$ = articleStore.pipe(select(state => state.articles));


}
