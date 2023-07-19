import { Component, Input, OnInit } from '@angular/core';
import { Sizes } from 'src/app/enums/Sizes';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() size: Sizes = Sizes.medium;
  @Input() pulsing: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
