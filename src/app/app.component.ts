import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zappy';
  tweets: Array<any>;

  constructor(public api: ApiService) {

    this.api.getTweets()
      .subscribe(res => this.tweets = res);

  }

}
