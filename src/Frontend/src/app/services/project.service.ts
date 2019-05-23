import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient, private alertifyService: AlertifyService) { }
  path = 'http://localhost:7000/';

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.path + 'projects');
  }

  getActiveProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.path + 'projects/active');
  }

  getPasiveProjectsByStudentId(sId: number): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.path + 'projects/student/' + sId + '/pasive');
  }

  getPasiveProjectsByInstructorId(iId: number): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.path + 'projects/instructor/' + iId + '/pasive');
  }

  getActiveProjectsByStudentId(sId: number): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.path + 'projects/student/' + sId + '/active');
  }

  getProjectById(pId): Observable<Project> {
    return this.httpClient.get<Project>(this.path + 'projects/' + pId);
  }

  createProject(project: Project) {
    this.httpClient.post(this.path + 'projects', project).subscribe();
    this.alertifyService.success('Project Created Successfully.');
  }

  updateProject(project) {
    this.httpClient.post(this.path + 'projects/update', project).subscribe();
    this.alertifyService.success('Project Updated Successfully.');
  }

  deleteProject(id) {
    this.httpClient.get(this.path + 'projects/delete' + id);
    this.alertifyService.success('Project Delete Successfully.');
  }
}
