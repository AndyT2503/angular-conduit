import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Article } from 'src/app/core/models';
import { ArticleFormData } from 'src/app/core/state';
import { TypedFormGroup } from 'src/app/shared/utils';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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

  tag!: string;

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
      validators: [Validators.required, Validators.maxLength(2)],
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  articleError = '';

  get tagList() {
    return this.articleForm.value.tags;
  }

  addTag(): void {
    let { tags } = this.articleForm.getRawValue();
    if(tags.length === 2) {
      this.tag = '';
      return;
    }
    tags = [...tags, this.tag];
    this.articleForm.patchValue({ tags: tags });
    this.tag = '';
  }

  removeTag(index: number): void {
    let { tags } = this.articleForm.getRawValue();
    tags = tags.filter((_, i) => i !== index);
    this.articleForm.patchValue({ tags: tags });
  }

  submit(): void {
    const { content, description, title } = this.articleForm.value;
    if (this.articleForm.invalid) {
      if (!title) {
        this.articleError = `title can't be blank`;
        return;
      }
      if (!content) {
        this.articleError = `content can't be blank`;
        return;
      }
      if (!description) {
        this.articleError = `description can't be blank`;
        return;
      }
    }
    this.articleError = '';
    this.articleSubmit.emit(this.articleForm.getRawValue());
  }
}
