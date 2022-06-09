import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { filter } from 'rxjs';
import { AuthRepository } from 'src/app/core/state/auth.repository';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authRepository = inject(AuthRepository);

  settingForm!: FormGroup<{
    username: FormControl<string>;
    bio: FormControl<string | null>;
    email: FormControl<string>;
    newPassword: FormControl<string | null>;
    id: FormControl<number>;
  }>;

  ngOnInit(): void {
    this.initForm();
    this.loadSettingForm();
  }

  loadSettingForm(): void {
    this.authRepository.authUser$
      .pipe(
        filter((user) => !!user),
        untilDestroyed(this)
      )
      .subscribe(
        user => {
          this.settingForm.patchValue({
            bio: user?.bio,
            email: user?.email,
            id: user?.id,
            username: user?.username
          })
        }
      );
  }

  initForm(): void {
    this.settingForm = new FormGroup({
      username: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      id: new FormControl(0, {
        nonNullable: true,
        validators: Validators.required,
      }),
      bio: new FormControl(''),
      email: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      newPassword: new FormControl(''),
    });
  }

  submit(): void {}

  logout(): void {
    this.authRepository.logout();
    this.router.navigate(['/login']);
  }
}
