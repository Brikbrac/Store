import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Flower } from "../../services/flower";
import { FlowerService } from '../../services/flower.service';

@Component({
    selector: "flowers-edit",
    templateUrl: "",
    styleUrls: [""]
})

export class FlowerEditComponent implements OnInit{
    flower: Flower;
    constructor(
        private flowerService : FlowerService,
        private route: ActivatedRoute,
        private location: Location
    ){}

    ngOnInit(): void{
        this.route.paramMap
            .switchMap((params: ParamMap) => this.flowerService.getFlower(params.get('id') as string))
            .subscribe(data => this.flower = data);
    }

    save(): void{
        this.flowerService.update(this.flower)
            .then(() => {
                console.log('Update Success');
                this.location.go('/');
            })
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}