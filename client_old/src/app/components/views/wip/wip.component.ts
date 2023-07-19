import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Banner } from '../../../types/Banner';
import { User } from '../../../types/User';

@Component({
  selector: 'app-wip',
  templateUrl: './wip.component.html',
  styleUrls: ['./wip.component.scss']
})
export class WipComponent implements OnInit {
  public loaded: boolean = false;
  public user?: User;

  constructor(private route: ActivatedRoute) { }

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
