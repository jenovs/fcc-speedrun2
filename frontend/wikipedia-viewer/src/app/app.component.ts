import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  titles = [];
  firstRender = true;
  term;
  maxResults: number = 10;

  constructor(private http: Http) {}

  handleSearch() {
    if (!this.term) return;

    if (this.maxResults < 1) this.maxResults = 1;
    if (this.maxResults > 500) this.maxResults = 500;

    this.titles = [];
    const baseUrl = 'https://en.wikipedia.org/w/api.php?'
    const params = {
      action: 'query',
      generator: 'search',
      prop: 'info',
      inprop: 'url',
      gsrsearch: `intitle:${this.term}`,
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
      this.term = '';
      this.firstRender = false;
      const json = res.json();

      if (!json.query) return;

      const pages = json.query.pages;
      for (let id in pages) {
        this.titles.push(pages[id]);
      }
    })

  }
  openRandom() {
    window.open('https://en.wikipedia.org/wiki/Special:Random');
  }
}
