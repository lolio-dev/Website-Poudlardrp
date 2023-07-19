import { Component, OnInit, Input } from '@angular/core';
import { getDateDiff } from 'src/utils/date';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input() title: string = 'title';
  @Input() subtitle: string = 'subtitle';
  @Input() text: string = 'text';
  @Input() image: string = 'image';
  @Input() date: number = 0;

  public dateDiff: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.dateDiff = `Il y a ${getDateDiff(Date.now(), this.date)}`;
  }

}
