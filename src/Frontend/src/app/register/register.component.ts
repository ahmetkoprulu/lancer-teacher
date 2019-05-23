import { Component, OnInit } from '@angular/core';
import { User } from '../models/instructor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proposal } from '../models/proposal';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ProposalService } from '../services/proposal.service';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';
import { ConfirmPasswordValidator } from '../validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: {name: '', surname: '', email: '', passwordHash: ''};
  registerForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', Validators.required],
        password_hash: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  postRegister() {
    if (this.registerForm.valid) {
      console.log('Okay');
      this.user = Object.assign({}, this.registerForm.value);
      if (this.registerForm.get('role').value === 'instructor') {
        this.userService.registerInstructor(this.user);
      } else {
      this.userService.registerStudent(this.user);
      }
    }
  }
}
