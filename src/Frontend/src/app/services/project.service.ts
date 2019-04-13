import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }
  path = 'http://localhost:7000/';

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.path + 'projects');
  }

  getProjectById(pId): Observable<Project> {
    return this.httpClient.get<Project>(this.path + 'projects/' + pId);
  }
}
