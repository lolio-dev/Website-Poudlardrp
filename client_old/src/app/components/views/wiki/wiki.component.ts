import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss'],
})
export class WikiComponent implements OnInit {
  public loaded:boolean = false;
  public user?:User

  constructor(private route:ActivatedRoute) {
    //TODO Create cart page => feature/wiki
  }

  ngOnInit(): void {
    Promise.all([this.loadUser()]).finally(() => {this.loaded = true})
  }

  async loadUser(){
    await this.route.data.subscribe(
      async (data) => {
        this.user = await data.user
      }
    );
  }

}
