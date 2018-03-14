import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
export interface Results{
  title : string;
  author : string;
  date : string;
  image : string;
}

const result : Results[]= [
  {title : 'Coco', author: 'Moi', date : 'Aujourdhui ', image : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/8AECsRLEDLoNvZ8JqrTFm0zBPqH.jpg'},
  {title : 'Le labyrinthe', author: 'Moi ', date : 'Aujourdhui ', image : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7h9LUexxkTSX9YWSQ88b6PE1JdL.jpg'},
  {title : 'Aléatoire', author: 'Moi ', date : 'Aujourdhui ', image : 'https://picsum.photos/200/300/?random'}
];
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    results : Results[];

  constructor(public navCtrl: NavController) {
      this.results= [];
  }

  onInput(event:any):void{
   const query : string = event.target.value;
   this.results=query?result:[];
  }

}
