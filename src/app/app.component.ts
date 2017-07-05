import { Component, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

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
      // .subscribe(data => {
      //   console.log(data.json());
      //   this.users = data.json().data;
      // });
      .map(res => res.json().data)
      .subscribe(users => this.users = users);
  }
}
