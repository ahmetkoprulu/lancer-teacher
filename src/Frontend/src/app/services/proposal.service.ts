import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from '../models/proposal';
import { AlertifyService } from './alertify.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private httpClient: HttpClient, private alertifyService: AlertifyService) { }
  path = 'http://localhost:7000/';

  getProposalByProjectId(pId): Observable<Proposal[]> {
    return this.httpClient.get<Proposal[]>(this.path + 'proposals/' + pId);
  }

  getActiveProposalsByInstructorId(iId): Observable<Proposal[]> {
    return this.httpClient.get<Proposal[]>(this.path + 'proposals/instructor/' + iId);
  }

  creteProposal(proposal) {
    let theaders = new HttpHeaders();
    theaders = theaders.append('Content-Type', 'application/json');
    this.httpClient.post(this.path + 'proposals', proposal, { headers: theaders })
    .subscribe(data => {
      this.alertifyService.success('Proposal Created Successfully');
    });
  }

  updateProposal(tid, tcomment, tprice) {
    this.httpClient.post(this.path + 'proposals/update', {id: tid, comment: tcomment, price: tprice }).subscribe();
    this.alertifyService.success('Proposal Updated Successfully.');
  }

  deleteProposal(id) {
    this.httpClient.get(this.path + 'proposals/delete/' + id).subscribe();
    this.alertifyService.success('Proposal Deleted Successfully.');
  }
}
