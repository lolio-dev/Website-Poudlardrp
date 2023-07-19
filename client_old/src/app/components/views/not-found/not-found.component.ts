import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sizes } from 'src/app/enums/Sizes';
import { ButtonTypes } from 'src/app/enums/Button/ButtonTypes';
import { Colors } from '../../../enums/Colors';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  public label = 'NOT_FOUND.BACK';
  public type: ButtonTypes = ButtonTypes.outlined;
  public size: Sizes = Sizes.medium;
  public color: Colors = Colors.dark;

  goBackBtnClass: string = 'btn btn--dark--outline btn--medium';

  constructor(private router: Router) {
    //TODO Faire le responsive
  }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
