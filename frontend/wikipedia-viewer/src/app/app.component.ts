import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  active;
  extract;
  titles = [];
  term;
  maxResults: string = "20";

  constructor(private http: Http) {}

  handleSearch(term) {
    this.titles = [];
    const baseUrl = 'https://en.wikipedia.org/w/api.php?'
    const params = {
      action: 'query',
      generator: 'search',
      prop: 'info',
      inprop: 'url',
      gsrsearch: `intitle:${term}`,
      gsrlimit: +this.maxResults,
      format: 'json',
      origin: '*'
    }

    function makeUrl(baseUrl, params) {
      const query = Object.keys(params).map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      });

      return baseUrl + query.join('&');
    }


    this.http.get(makeUrl(baseUrl, params))
    .subscribe(res => {
      const json = res.json();
      const pages = json.query.pages;
      for (let id in pages) {
        this.titles.push(pages[id]);
      }
    })
  }
}
