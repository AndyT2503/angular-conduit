import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthRepository } from 'src/app/core/state/auth.repository';
import { UserRepository } from 'src/app/core/state/user.repository';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly authRepository = inject(AuthRepository);
  private readonly userRepository = inject(UserRepository);

  registerForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    username: FormControl<string>;
  }>;
  registerError = '';

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      username: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
    });
  }

  submit(): void {
    const { password, email, username } = this.registerForm.value;
    if (this.registerForm.invalid) {
      if (!password) {
        this.registerError = "password can't be blank";
      }
      if (!email) {
        this.registerError = "email can't be blank";
      } else {
        this.registerError = "username can't be blank";
      }
      this.cdr.markForCheck();
      return;
    }
    const userList = this.userRepository.store.getValue().users;
    if (userList.some((x) => x.email === email)) {
      this.registerError = 'user has been existed';
      return;
    }
    const user = {
      email: email!,
      password: password!,
      username: username!,
      id: Math.random(),
    };
    this.userRepository.addUser(user);
    this.authRepository.login(user);
    this.router.navigate(['']);
  }
}
