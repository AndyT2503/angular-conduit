import { Observable, of, switchMap } from 'rxjs';
import { AuthRepository } from 'src/app/core/state/auth.repository';
import { inject, Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { Comment } from '../models/comment.model';

type CommentProps = {
  comments: Comment[];
};

const commentStore = createStore(
  { name: 'comments' },
  withProps<CommentProps>({ comments: [] })
);

persistState(commentStore, {
  key: 'comments',
  storage: localStorageStrategy,
});

@Injectable({
  providedIn: 'root',
})
export class CommentRepository {
  readonly commentStore = commentStore;
  private readonly authRepository = inject(AuthRepository);

  createComment(content: string, articleId: number): void {
    const { user } = this.authRepository.authStore.getValue();
    const newComment: Comment = {
      articleId,
      content,
      creationTime: new Date(),
      id: Math.random(),
      userId: user!.id,
    };
    const comments = [newComment, ...this.commentStore.getValue().comments];
    this.commentStore.update((state) => ({
      ...state,
      comments,
    }));
  }

  deleteComment(id: number): void {
    let { comments } = this.commentStore.getValue();
    comments = comments.filter((x) => x.id !== id);
    this.commentStore.update((state) => ({
      ...state,
      comments,
    }));
  }

  loadCommentByArticleId(articleId: number): Observable<Comment[]> {
    return this.commentStore.pipe(
      select((x) => x.comments),
      switchMap((comments) => {
        comments = comments.filter((x) => x.articleId === articleId);
        return of(comments);
      })
    );
  }
}
