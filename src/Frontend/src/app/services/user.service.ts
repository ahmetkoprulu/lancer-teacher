import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { User } from '../models/instructor';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  path = 'http://localhost:7000/';
  user: User;
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  isAuthenticated: boolean;
  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router
  ) {
    this.isAuthenticated = this.loggedIn();
    this.user = new User();
  }

  registerStudent(student) {
    let theaders = new HttpHeaders();
    theaders = theaders.append('Content-Type', 'application/json');
    this.httpClient.post(this.path + 'students', student, { headers: theaders })
    .subscribe(data => {
      this.alertifyService.success('Registration Successful.');
      this.router.navigateByUrl('/login');
    });
  }

  updateStudent(student) {
    this.httpClient.post(this.path + 'students/update', student)
    .subscribe(data => {
      this.alertifyService.success('Profile Updated Successfully.');
    });
  }

  loginStudent(temail: string, tpasswordHash: string) {
    let theaders = new HttpHeaders();
    theaders = theaders.append('Content-Type', 'application/json');
    console.log('sa');
    this.httpClient.post(this.path + 'students/login', { email: temail, password_hash: tpasswordHash }, { headers: theaders })
      .subscribe(data => {
        console.log('as')
        // tslint:disable-next-line:no-string-literal
        localStorage.setItem('token', data['token']);
        // tslint:disable-next-line:no-string-literal
        this.userToken = data['token'];
        // tslint:disable-next-line:no-string-literal
        console.log('as1')
        this.decodedToken = this.jwtHelper.decodeToken(data['token']);
        this.user = JSON.parse(this.decodedToken.identity);
        this.user.role = 'student';
        this.isAuthenticated = true;
        this.alertifyService.success('Login Succesful');
        this.router.navigateByUrl('/projects');
      });
  }

  registerInstructor(instructor) {
    let theaders = new HttpHeaders();
    theaders = theaders.append('Content-Type', 'application/json');
    this.httpClient.post(this.path + 'instructors', instructor, { headers: theaders })
    .subscribe(data => {
      this.alertifyService.success('Registration successful');
      this.router.navigateByUrl('/login');
    });
  }

  updateInstructor(instructor) {
    this.httpClient.post(this.path + 'instructors/update', instructor)
    .subscribe(data => {
      this.alertifyService.success('Profile Updated Successfully.');
    });
  }

  loginInstructor(temail: string, tpasswordHash: string) {
    let theaders = new HttpHeaders();
    theaders = theaders.append('Content-Type', 'application/json');
    this.httpClient.post(this.path + 'instructors/login', { email: temail, password_hash: tpasswordHash }, { headers: theaders })
      .subscribe(data => {
        // tslint:disable-next-line:no-string-literal
        localStorage.setItem('token', data['token']);
        // tslint:disable-next-line:no-string-literal
        this.userToken = data['token'];
        // tslint:disable-next-line:no-string-literal
        this.decodedToken = this.jwtHelper.decodeToken(data['token']);
        this.user = JSON.parse(this.decodedToken.identity);
        this.user.role = 'instructor';
        this.isAuthenticated = true;
        this.alertifyService.success('Login Succesful');
        this.router.navigateByUrl('/projects');
      });
  }

  getInstructorById(id: number) {
    return this.httpClient.get<User>(this.path + 'instructor/' + id);
  }

  logOut() {
    console.log('sa');
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.user.role = null;
  }

  getCurrentUser() {
    return this.user;
  }

  loggedIn() {
    console.log(tokenNotExpired(this.userToken));
    if (!this.userToken) { return false; }
    return tokenNotExpired(this.userToken);
  }

  getToken() {
    return this.decodedToken;
  }

  getCurrentUserId() {
    return this.user.id;
  }

  isInstructor() {
    return this.user.role === 'instructor';
  }

  isStudent() {
    return this.user.role === 'student';
  }
}
