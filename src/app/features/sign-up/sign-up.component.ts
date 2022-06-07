import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    username: FormControl<string>;
  }>;
  registerError = '';
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

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
    this.router.navigate(['']);
  }
}
