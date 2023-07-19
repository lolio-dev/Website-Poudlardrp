import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/model/Api.service';
import { News } from 'src/app/types/News';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-quibbler',
  templateUrl: './quibbler.component.html',
  styleUrls: ['./quibbler.component.scss'],
})
export class QuibblerComponent implements OnInit {
  public loaded:boolean = false;
  public articles?: News[] = [];
  public user?: User;

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    Promise.all([this.loadUser(), this.loadArticles()]).finally(() => {this.loaded = true})
  }

  async loadUser(){
    await this.route.data.subscribe(
      async (data) => {
        this.user = await data.user
      }
    );
  }

  async loadArticles(){
    this.articles = await (await ApiService.getNews()).reverse();
  }
  
}
