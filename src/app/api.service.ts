import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
const base_url = 'http://0abe908a.ngrok.io';


@Injectable()
export class ApiService {

  result: any;

  constructor(public http: Http) { }

  getTweets() {
    return this.http.get(`${base_url}/twitter/`)
      .map(result => this.result = result.json());
  }

}
