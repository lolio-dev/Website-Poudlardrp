import { Component, OnInit, Input } from '@angular/core';
import { ItemTypes } from 'src/app/enums/Items/ItemsTypes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  @Input() type: ItemTypes = ItemTypes.default;
  @Input() title?: string = 'title';
  @Input() description?: string = 'description';
  @Input() price?: number = 0;
  @Input() image?: string = 'image';
  @Input() id: number = 0;

  constructor(private router: Router) {
  }

  redirectToProduct() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate([`/product/${this.id}`]));
  }

  ngOnInit(): void {}
}
