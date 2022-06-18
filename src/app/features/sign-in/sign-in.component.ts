import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthRepository, UserRepository } from 'src/app/core/state';
import { TypedFormGroup } from 'src/app/shared/utils';

type SignInFormData = {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly authRepository = inject(AuthRepository);
  private readonly userRepository = inject(UserRepository);

  loginForm!: TypedFormGroup<SignInFormData>;
  loginError = '';

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
    });
  }

  submit(): void {
    const userList = this.userRepository.store.getValue().users;
    const { password, email } = this.loginForm.value;
    if (this.loginForm.invalid) {
      if (!password) {
        this.loginError = "password can't be blank";
      } else {
        this.loginError = "email can't be blank";
      }
      this.cdr.markForCheck();
      return;
    }
    const userIndex = userList.findIndex(x => x.password === password && x.email === email);
    if (userIndex === -1) {
      this.loginError = 'email or password invalid';
      this.cdr.markForCheck();
      return;
    }
    this.authRepository.updateAuthUserInfo(userList[userIndex]);
    this.router.navigate(['']);
  }
}
