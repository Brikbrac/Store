import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Flower } from "../../services/flower";
import { FlowerService } from '../../services/flower.service';

@Component({
    selector: "flowers-details",
    templateUrl: "./flower.component.html"
})

export class flowerComponent implements OnInit{
    flower : Flower;
    constructor(
        private flowerService: FlowerService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.flowerService.getFlower(params.get('id') as string))
            .subscribe(data => this.flower = data);
    }

    delete() : void{
        this.flowerService.delete(this.flower)
            .then(() => {
                this.location.go('/');
            })
            .catch((err) => console.error('An error occurred', err));
    }
}