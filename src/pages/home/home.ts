import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import { key } from '../../app/tmdb';
import { Subscription } from 'rxjs/Subscription';
import { Shake } from '@ionic-native/shake';

export interface Result{
  overview : string;
  title : string;
  vote_average : number;
  release_date : string;
  poster_path : string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    shakeSubscription : Subscription;
    results : Observable<Result[]>;
    results_rech : Observable<Result[]>;
    pushPage : typeof DetailsPage= DetailsPage;
   
  constructor(public http: HttpClient, public alert : AlertController,public navCtrl: NavController, public platform : Platform, public shake : Shake ) {
      this.results = Observable.of([]);
  }

  onInput(event:any):void{
   const query : string = event.target.value;
   this.results_rech=query? this.fetchResults(query) : Observable.of([]);
   this.results=query? this.discoverMovies(): Observable.of([]);
  }

  fetchResults(recherche : string): Observable<Result[]>{
     return this.http.get<Result[]>("https://api.themoviedb.org/3/search/movie", {
       params : {api_key : key, query : recherche}
     }).pluck("results");
    
  }

  private discoverMovies(): Observable<Result[]> {
    return this.http.get<Result[]>("https://api.themoviedb.org/3/discover/movie", {
       params : {api_key : key,primary_release_year : '2019'}
     }).pluck("results");
  }

  private showRandomMovieAlert(movies : Result[]):void{
    var movie = movies[Math.floor(Math.random()*movies.length)];
    if(!movie){return;}
    let alert = this.alert.create({
      title: movie.title,
      message: movie.overview,
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Details',
          handler: () => {
            this.navCtrl.push(this.pushPage, {film : movie});
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidEnter() {
    this.shakeSubscription = Observable.fromPromise(this.platform.ready()).switchMap(() => this.shake.startWatch()).switchMap(()=>this.discoverMovies()).subscribe(movies => this.showRandomMovieAlert(movies));
  }

  ionViewWillLeave(){
    this.shakeSubscription.unsubscribe();
  }

}


