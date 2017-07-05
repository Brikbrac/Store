import { Component, OnInit } from '@angular/core';

import { Flower } from '../../services/flower';
import { FlowerService } from '../../services/flower.service';


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  flowers: Flower[];

  constructor(private flowerService: FlowerService) { }

  ngOnInit(): void {
    this.flowerService.getFlowers()
      .then(f_ => this.flowers = f_);
  }
}