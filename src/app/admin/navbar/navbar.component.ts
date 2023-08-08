import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EventService } from '../../shared/services/event.service';
import { indexOf as _indexOf } from 'lodash';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  sidebarVisible: boolean = false;
  @ViewChild('sidebarNav', {static: true}) sidebarNav!: ElementRef;
  items: MenuItem[] | undefined;
  constructor(private renderer: Renderer2, private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.buttonEvent.subscribe(value => this.sidebarVisible = value);
    this.items = [
      {
          label: 'Dashboard',
          icon: 'pi pi-home'
      },
      {
        label: 'Users',
        icon: 'pi pi-users'
    }
    ];
  }

  closeNav() {
    this.renderer.setStyle(this.sidebarNav.nativeElement, 'right', '0px');
    this.renderer.setStyle(this.sidebarNav.nativeElement, 'left', '-280px');
  }

  openSideBar() {
    this.eventService.buttonEvent.emit(true);
  }

}
