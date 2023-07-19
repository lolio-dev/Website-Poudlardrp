import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { User } from '../../../types/User';

@Component({
  selector: 'app-terms-cgv',
  templateUrl: './terms-cgv.component.html',
  styleUrls: ['./terms-cgv.component.scss']
})
export class TermsCgvComponent implements OnInit {
  public loaded: boolean = false;
  public user?: User;
  
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    Promise.all([this.loadUser()]).finally(() => this.loaded = true)
  }

  async loadUser(){
    await this.route.data.subscribe(
      async (data) => {
        this.user = await data.user;
      }
    );
  }
}
