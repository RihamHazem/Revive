import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestRequestsService {
  apiUrl = '';
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private http: HttpClient) { }
  interColrImage(imageFile: string|ArrayBuffer, positions) {
    const params = {imageFile, positions};
    return this.http.post<any>(this.apiUrl + 'colorize', params, this.options);
  }
}
