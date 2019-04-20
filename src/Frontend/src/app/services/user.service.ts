import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  path = 'http://localhost:7000/';
  user: any;
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  isAuthenticated: boolean;

  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router
  ) { this.isAuthenticated = this.loggedIn();  this.user = JSON.parse(this.jwtHelper.decodeToken(localStorage.getItem('token')).identity); }

  registerStudent(student) {

  }

  loginStudent(temail: string, tpasswordHash: string) {
    let theaders = new HttpHeaders();
    theaders = theaders.append('Content-Type', 'application/json');
    this.httpClient.post(this.path + 'students/login', { email: temail, passwordHash: tpasswordHash }, { headers: theaders })
      .subscribe(data => {
        localStorage.setItem('token', data.toString());
        this.userToken = data;
        this.decodedToken = this.jwtHelper.decodeToken(data.toString());
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

  loginInstructor(temail: string, tpasswordHash: string) {
    let theaders = new HttpHeaders();
    theaders = theaders.append('Content-Type', 'application/json');
    this.httpClient.post(this.path + 'instructors/login', { email: temail, passwordHash: tpasswordHash }, { headers: theaders })
      .subscribe(data => {
        // tslint:disable-next-line:no-string-literal
        localStorage.setItem('token', data['token']);
        // tslint:disable-next-line:no-string-literal
        this.userToken = data['token'];
        // tslint:disable-next-line:no-string-literal
        this.decodedToken = this.jwtHelper.decodeToken(data['token']);
        this.user = JSON.parse(this.decodedToken.identity);
        this.isAuthenticated = true;
        this.alertifyService.success('Login Succesful');
        this.router.navigateByUrl('/projects');
      });
  }

  logOut() {
    console.log('sa');
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  getCurrentUser() {
    return this.user;
  }

  loggedIn() {
    console.log(tokenNotExpired(this.userToken));
    return tokenNotExpired(this.userToken);
  }

  getToken() {
    return this.decodedToken;
  }

  getCurrentUserId() {
    console.log(this.jwtHelper.decodeToken(localStorage.getItem('token')));
    return this.jwtHelper.decodeToken(localStorage.getItem('token'));
  }
}
