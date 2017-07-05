import { Component, OnInit } from '@angular/core';
import { MdButtonModule, MdCardModule, MdMenuModule, MdGridListModule } from "@angular/material";

import { Flower } from '../../services/flower';
import { FlowerService } from '../../services/flower.service';

@Component({
  selector: 'dashboard-flowers',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  flowers: Flower[];

  constructor(private flowerService: FlowerService) { }

  ngOnInit(): void {
    this.flowerService.getFlowers()
      .then((f_) => this.flowers = f_);
  }
}