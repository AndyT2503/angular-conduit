import { Router, RouterModule } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserData } from 'src/app/core/data/user.data';
import { AuthRepository } from 'src/app/core/state/auth.repository';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  loginError = '';
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authRepository: AuthRepository
  ) {}

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
    const userIndex = UserData.findIndex(x => x.password === password || x.email === email);
    if (userIndex === -1) {
      this.loginError = 'email or password invalid';
      this.cdr.markForCheck();
      return;
    }
    this.authRepository.login(UserData[userIndex]);
    this.router.navigate(['']);
  }
}
