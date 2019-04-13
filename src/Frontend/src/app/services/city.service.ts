import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class CityService {

    constructor(private httpClient: HttpClient) { }
    path = 'http://localhost:7000/';

    getCities(): Observable<Project[]>{
        return this.httpClient.get<Project[]>(this.path + 'projects');
    }
}
