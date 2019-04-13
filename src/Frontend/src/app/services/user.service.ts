import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private httpClient: HttpClient) { }
path = 'http://localhost:7000/';

registerStudent() {
  return 1;
}

loginStudent(email: string, passwordHash: string) {
  return 1;
}

registerInstructor() {
  return 1;
}

loginInstructor(email: string, passwordHash: string) {
  return 1;
}
}
