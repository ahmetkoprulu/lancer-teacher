import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from '../models/proposal';
import { AlertifyService } from './alertify.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private httpClient: HttpClient, private alertifyService: AlertifyService) { }
  path = 'http://localhost:7000/';

  createContract(projId, propId) {
    let theaders = new HttpHeaders();
    theaders = theaders.append('Content-Type', 'application/json');
    this.httpClient.post(this.path + 'contracts', {project_id: projId, proposal_id: propId}, { headers: theaders })
    .subscribe(data => {
      this.alertifyService.success('Contract Created Successfully');
    });
  }
}