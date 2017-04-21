import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works';

  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get('https://fcc-speedrun2.jenovs.com/api/quote').subscribe(res => {
      console.log(res.json());
    })
  }
}
