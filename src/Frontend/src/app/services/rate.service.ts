import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private httpClient: HttpClient, private alertifyService: AlertifyService) { }
  path = 'http://localhost:7000/';

  createRate(rate) {
    this.httpClient.post(this.path + 'rates', rate)
    .subscribe(data => {
      this.alertifyService.success('Rate Created Successfully');
    });
  }

  updateRate(rate) {
    this.httpClient.post(this.path + 'rates/update', rate).subscribe();
    this.alertifyService.success('Rate Updated Successfully.');
  }

  deleteRate(id) {
    this.httpClient.get(this.path + 'rates/delete/' + id).subscribe();
    this.alertifyService.success('Rate Deleted Successfully.');
  }
}
