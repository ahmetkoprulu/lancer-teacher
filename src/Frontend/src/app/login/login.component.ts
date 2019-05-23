import { Component, OnInit } from '@angular/core';
import { User } from '../models/instructor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { ConfirmPasswordValidator } from '../validators/confirm-password.validator';
import { Student } from '../models/student';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  instructor: User;
  student: Student;
  loginForm: FormGroup;
  credentials = { email: null, passwordHash: null, role: null };
  // tslint:disable-next-line:max-line-length
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        passwordHash: ['', Validators.required],
        role: ['', Validators.required]
    });
  }

  postLogin() {
    if (this.loginForm.valid) {
      this.credentials = Object.assign({}, this.loginForm.value);
      if (this.credentials.role === 'instructor') {
        this.userService.loginInstructor(this.credentials.email, this.credentials.passwordHash);
      } else {
      this.userService.loginStudent(this.credentials.email, this.credentials.passwordHash);
      }
    }
  }
}
