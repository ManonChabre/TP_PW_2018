import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { key } from '../../app/tmdb';

export interface Result{
  overview : string;
  title : string;
  popularity : number;
  release_date : string;
  poster_path : string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    results : Observable<Result[]>;
    pushPage : typeof DetailsPage= DetailsPage;

  constructor(public http: HttpClient) {
      this.results= Observable.of([]);
  }

  onInput(event:any):void{
   const query : string = event.target.value;
   this.results=query? this.fetchResults(query) : Observable.of([]);
  }

  fetchResults(recherche : string): Observable<Result[]>{
     return this.http.get<Result[]>("https://api.themoviedb.org/3/search/movie", {
       params : {api_key : key, query : recherche}
     }).pluck("results");
    
    }
}


