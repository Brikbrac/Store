import { Flower } from './flower';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class FlowerService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private flowersUrl = 'flower';  // URL to web api
  // private FLOWERS : Flower[] = [
  //   {_id:"595bc6aa4b3795220498d8d0", name:"BOUQUET ADONIS", price:149, color:"Pink", description:"Spécial Saint Valentin ! C’est pour comparateur-fleuriste.com, le bouquet de la saint valentin."},
  //   {_id:"595bc6aa4b3795220498d8d1", name:"BOUQUET FEELING", price:30.5, color:"Red", description:"Spécial Saint-Valentin ! Faites plaisir et dites lui combien vous l’aimez \n   follement avec ce magnifique bouquet spécialement conçu par les fleuristes de florajet pour un moment inoubliable"},
  //   {_id:"595bc6aa4b3795220498d8d2", name:"BOUQUET MARTINGALE", price:77.3, color:"Green", description:"Spécial Saint Valentin ! Voilà un bouquet qui ne laisse rien au hasard. Avec ce superbe bouquet, \n                                        ue vous pouvez faire livrer par internet à la destination de votre choix par un fleuriste (évidemment), \n                                        vous n’aurez plus besoin de parler"}
  // ];

  constructor(private http: Http){}

  getFlowers(): Promise<Flower[]> {
    return this.http.get(this.flowersUrl)
               .toPromise()
               .then(response => response.json() as Flower[]) // response.json().data as Flower[]
               .catch(this.handleError);
  }

  getFlower(id: string): Promise<Flower> {
    const url = `${this.flowersUrl}/get/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Flower)
      .catch(this.handleError);
  }

  update(flower: Flower): Promise<Flower> {
    const url = `${this.flowersUrl}/edit/${flower._id}`;
    return this.http
      .post(url, JSON.stringify(flower), {headers: this.headers})
      .toPromise()
      .then(() => flower)
      .catch(this.handleError);
  }

  getFlowersSlowly(): Promise<Flower[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getFlowers()), 2000);
    });
  }

  // getFlower(id: string): Promise<Flower> {
  //   return this.getFlowers()
  //              .then(flowers => flowers.find(flower => flower._id === id));
  // }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
