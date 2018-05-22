import {NgModule, Component, Injectable} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {HttpModule, Http, Response} from '@angular/http';
import 'rxjs/Rx';

class SearchItem {
  constructor(public track: string,
              public artist: string,
              public link: string,
              public thumbnail: string,
              public artistId: string) {
  }
}



@Injectable()
export class MainService {
  apiRoot: string = 'https://itunes.apple.com/search';
  results: Object[];
  loading: boolean;

  constructor(private _http: Http) {
    this.results = [];
    this.loading = false;
  }

  search(terms: string) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.apiRoot}?term=${terms}&media=music&limit=20`;

      this._http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            this.results = res.json().results.map(item => {
              return new SearchItem(
                item.trackName,
                item.artistName,
                item.trackViewUrl,
                item.artworkUrl30,
                item.artistId
              );
            });
            console.log(this.results);
            // this.results = res.json().results;
            resolve();
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;
  }

}
