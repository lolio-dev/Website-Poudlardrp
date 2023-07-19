import {
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { Sizes } from 'src/app/enums/Sizes';
import { Colors } from '../../../enums/Colors';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[custom-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit {
  @Input() label: string = 'Bouton';
  @Input() isRounded: boolean = false;
  @Input() size: Sizes = Sizes.medium;
  @Input() color: Colors = Colors.primary;
  @Input() opacity: string = '0.5';

  @Output() btnClicked = new EventEmitter<string>();

  @HostListener('click') onClick() {
    this.btnClicked.emit(this.label);
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
