import { Http } from '@angular/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() title;
  extract = '';
  showExtract = false;
  firstShow = true;

  constructor(private http: Http) { }

  ngOnInit() {
    this.fetchData(this.title.pageid);
  }

  fetchData(id: number) {
    this.http.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&pageids=${id}&prop=extracts&explaintext=true`)
    .subscribe(res => {
      const json = res.json();
      this.extract = json.query.pages[id].extract.substring(0, 150) + '...';
      if (this.firstShow) this.showExtract = true;
    })
  }
}
