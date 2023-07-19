import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() value: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = 'placeholder';
  @Input() required: boolean = false;
  @Input() style: { [klass: string]: any; } | null = null;
  @Input() isDisabled: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}
