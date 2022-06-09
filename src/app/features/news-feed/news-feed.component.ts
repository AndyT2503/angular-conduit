import { AuthRepository } from 'src/app/core/state/auth.repository';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFeedComponent implements OnInit {
  private readonly authRepository = inject(AuthRepository);
  authUser$ = this.authRepository.authUser$;
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
