import { ArticleFormData } from './../../../core/state/article.repository';
import { TypedFormGroup } from './../../../shared/utils/typed-form';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Article } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleFormComponent {
  @Input() set article(article: Article) {
    this.articleForm.setValue({
      title: article.title,
      description: article.description,
      content: article.content,
      tags: article.tags,
    });
  }

  @Output() articleSubmit = new EventEmitter<ArticleFormData>();

  readonly articleForm: TypedFormGroup<ArticleFormData> = new FormGroup({
    content: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    tags: new FormControl(<string[]>[], {
      nonNullable: true,
      validators: Validators.required,
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  articleError = '';
  submit(): void {
    if (this.articleForm.invalid) {
      return;
    }
    this.articleSubmit.emit(this.articleForm.getRawValue());
  }
}
