import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { Gems } from '../../../types/Gems';

@Component({
  selector: 'app-gems-offer',
  templateUrl: './gems-offer.component.html',
  styleUrls: ['./gems-offer.component.scss']
})
export class GemsOfferComponent implements OnInit {
  @Input() offer: Gems = {
    gemOfferId: -1,
    gems : 0,
    bonus: 0,
    price: 0,
    stripId: ""
  };
  @Input() image?: string = 'image';

  @Output() offerSelected = new EventEmitter<Gems>();

  constructor(private modalService: ModalService) {
  }

  /**
 * Open a modal (used for login button)
 * @param id
 */
  openModal(id: string): void {
    this.offerSelected.emit(this.offer)
    this.modalService.open(id);
  }

  ngOnInit(): void {}

}
