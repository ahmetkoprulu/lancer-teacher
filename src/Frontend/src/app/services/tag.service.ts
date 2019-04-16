import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(private httpClient: HttpClient) { }
  path = 'http://localhost:7000/';

  getTags(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(this.path + 'tags');
  }
}
