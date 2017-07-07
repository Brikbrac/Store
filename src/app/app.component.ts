import { Component, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';
import {MdButtonModule, MdMenuModule} from '@angular/material';

import { Http } from '@angular/http';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users : User[];
  constructor(private http:Http){}

  ngOnInit(){
    this.http.get('https://reqres.in/api/users')
      .map(res => res.json().data)
      .subscribe(users => this.users = users);
  }
}
