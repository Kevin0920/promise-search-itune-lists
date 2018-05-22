import { Component } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private loading = false;
  
  constructor(private itunes: MainService) { }

  doSearch(term: string) {
    this.loading = true;
    this.itunes.search(term)
    .then(() => this.loading = false);
    // console.log(term)
  }
}
