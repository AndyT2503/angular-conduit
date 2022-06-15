import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentRepository } from 'src/app/core/state/comment.repository';

@Component({
  selector: 'app-comment-form[articleId]',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent {
  @Input() articleId!: number;

  private readonly commentRepository = inject(CommentRepository);
  comment!: string;

  postComment(): void {
    this.commentRepository.createComment(this.comment, this.articleId);
    this.comment = '';
  }
}
