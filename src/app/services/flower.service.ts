import { Flower } from './flower';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class FlowerService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private flowersUrl = 'flower';  // URL to web api

  constructor(private http: Http){}

  getFlowers(): Promise<Flower[]> {
    return this.http.get(this.flowersUrl)
               .toPromise()
               .then(response => response.json().data as Flower[])
               .catch(this.handleError);
  }

  getFlowersSlowly(): Promise<Flower[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getFlowers()), 2000);
    });
  }

  getHero(id: string): Promise<Flower> {
    return this.getFlowers()
               .then(flowers => flowers.find(flower => flower._id === id));
  }

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
