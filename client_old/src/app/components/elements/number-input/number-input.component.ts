import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Sizes } from '../../../enums/Sizes';

export type emitType={
  value:number;
  id:string;
}

@Component({
  selector: 'app-number-input, div[custom-number]',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NumberInputComponent implements OnInit {
  @Output() valueChanges = new EventEmitter<emitType>();

  @Input() size: Sizes = Sizes.medium;
  @Input() counterValue: number = 1;
  @Input() id: string = "";


  constructor() {
  }

  ngOnInit(): void {
  }

  increaseCounter() {
    this.counterValue++;
    this.valueChanges.emit({
      value: this.counterValue,
      id: this.id
    });
  }

  decreaseCounter() {
    if (this.counterValue != 1) {
      this.counterValue--;
      this.valueChanges.emit({
        value: this.counterValue,
        id: this.id
      });
    }
  }
}
