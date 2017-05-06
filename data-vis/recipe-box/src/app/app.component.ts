import { Component, OnInit } from '@angular/core';

import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RecipesService],
})
export class AppComponent implements OnInit {
  title = 'app works!';
  constructor(private recipes: RecipesService) {}

  ngOnInit() {
    this.title = this.recipes.recipes.join(', ')
  }
}
