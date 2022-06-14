import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { User } from 'src/app/core/models/user.model';
import { UserRepository } from 'src/app/core/state/user.repository';

@Component({
  selector: 'app-article[article]',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {
  @Input() article!: Article;
  readonly userRepository = inject(UserRepository);

  author!: User;
  ngOnInit() {
    this.userRepository
      .getUserById(this.article.userId)
      .pipe(take(1))
      .subscribe((res) => (this.author = res));
  }
}
