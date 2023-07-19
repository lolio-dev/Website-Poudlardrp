import { Component, Input, OnInit } from '@angular/core';
import { isEqual } from 'lodash';
import { Sizes } from 'src/app/enums/Sizes';
import { Link } from 'src/app/interfaces/link-interface';
import { ModalService } from 'src/app/services/modal.service';
import links from 'src/assets/datas/links.json';
import { updateSessionStorage } from 'src/app/store';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() user?: User;

  public userGems?: number = 0;
  private interactables: HTMLElement[];
  private links: NodeListOf<Element>;

  //Style
  public logoSize: Sizes = Sizes.mini;
  public isNavOpened: string = 'closed';

  //Full links
  public shopLinks: Link[] = links.shop;
  public gameLinks: Link[] = links.game;
  public quibblerLinks: Link[] = links.quibbler;

  //Links without title
  public laptopShopLinks: Link[] = links.shop.slice().splice(1);
  public laptopGameLinks: Link[] = links.game.slice().splice(1);
  public laptopQuibblerLinks: Link[] = links.quibbler.slice().splice(1);


  constructor(private modalService: ModalService) {
    this.interactables = [];
    this.links = [] as any;
  }



  ngOnInit(): void {}

  ngOnChanges(): void {
    this.userGems = this.user?.gems || 0;
  }

  ngAfterViewInit(): void {
    this.interactables = [
      document.getElementsByTagName('main')[0],
      document.getElementsByTagName('div')[6],
      document.getElementsByTagName('div')[8],
      document.getElementsByTagName('ul')[4],
      document.getElementsByTagName('ul')[5],
      document.getElementsByTagName('ul')[6],
    ];
    this.links = document.querySelectorAll('.link');

    this.addSwipControls();
    this.addLinksControls();
  }

  logout(){
    updateSessionStorage({acessToken: undefined, refreshToken:undefined});
    window.location.reload();
  }

  /**
   * Open nav menu on mobile swipe
   */
  addSwipControls() {
    this.interactables.forEach(element => {
      const hammertime: HammerManager = new Hammer(element, {});

      hammertime.on('swiperight', () => {
        this.isNavOpened = 'open';
      });
      hammertime.on('swipeleft', () => {
        if (this.isNavOpened !== 'closed') {
          this.isNavOpened = 'closing';
        }
      });
    });
  }

  /**
   * - Close links on click on main page
   * - Open links on hover and on click
   */
  addLinksControls() {
    document.querySelector('main')?.addEventListener('click', () => {
      this.links.forEach((e: any) => {
        if (e.children[1]) {
          e.children[1].style.display = 'none';
        }
      });
    });

    this.links.forEach((el: any) => {
      el.addEventListener('mouseover', () => {
        this.links.forEach((e: any) => {
          if (!isEqual(e, el) && e.children[1]) {
            e.children[1].style.display = 'none';
          }
        });
        el.children[1].style.display = 'flex';
      });
    });
    
    this.links.forEach((el: any) => {
      el.children[1].addEventListener('mouseout', () => {
        this.links.forEach((e: any) => {
          e.children[1].style.display = 'none';
        });
      });
    })
  }

  /**
   * Open and Close links
   */
  toggleLinks(event: any) {
    let el = event.target.parentElement;

    el = el.className !== 'link' ? el.parentElement : el;
    el = el.children[1];
    el.style.display = el.style.display === 'none' ? 'flex' : 'none';
  }

  /**
   * Open and Close menu
   */
  toggleMenu(event: any) {
    const verticalNav = event.target.parentNode.parentNode.children[1];

    if (verticalNav.className.includes('closed')) {
      this.isNavOpened = 'open';
    } else {
      this.isNavOpened = this.isNavOpened === 'open' ? 'closing' : 'open';
    }
  }

  /**
   * Open a modal (used for login button)
   * @param id
   */
  openModal(id: string): void {
    this.modalService.open(id);
  }
}
