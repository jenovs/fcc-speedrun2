import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  quote;
  author;
  quoteId;

  constructor(private http: Http) {}

  ngOnInit() {
    this.getQuote();
  }

  getQuote(e?) {
    if (e && (e.target.id === 'tweet-button' || e.target.parentNode.id === 'tweet-button')) {
      // return console.log('tweet clicked')
      const tweetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.quote)} -${this.author || ''}`;
      return window.open(tweetLink);
    }
    this.http.get('https://fcc-speedrun2.jenovs.com/api/quote').subscribe(res => {
      const { quote, author, id } = res.json();
      if (id === this.quoteId) return this.getQuote();
      this.quote = quote;
      this.author = author;
      this.quoteId = id;
    })

  }
}
