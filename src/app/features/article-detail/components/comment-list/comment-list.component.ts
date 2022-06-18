import { RouterModule } from '@angular/router';
import { UserRepository } from 'src/app/core/state/user.repository';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CommentRepository } from 'src/app/core/state/comment.repository';
import { User, Comment } from 'src/app/core/models';
@Component({
  selector: 'app-comment-list[articleId]',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent implements OnInit {
  @Input() articleId!: number;

  private readonly commentRepository = inject(CommentRepository);
  private readonly userRepository = inject(UserRepository);
  comments$!: Observable<Comment[]>;

  ngOnInit(): void {
    this.comments$ = this.commentRepository.loadCommentByArticleId(
      this.articleId
    );
  }

  loadAuthorComment(authorId: number): Observable<User> {
    return this.userRepository.getUserById(authorId);
  }
}
