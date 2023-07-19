import { Component, OnInit } from '@angular/core';
import { Sizes } from 'src/app/enums/Sizes';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public logoSize = Sizes.large
  public pulsing = true;

  constructor() { }

  ngOnInit(): void {
  }

}
