import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from '../models/proposal';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private httpClient: HttpClient) { }
  path = 'http://localhost:7000/';

  getProposalByProjectId(pId): Observable<Proposal[]> {
    return this.httpClient.get<Proposal[]>(this.path + 'proposals/' + pId);
  }
}
