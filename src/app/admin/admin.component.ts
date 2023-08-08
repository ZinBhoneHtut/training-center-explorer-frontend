import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EventService } from '../shared/services/event.service';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @ViewChild(NavbarComponent) navbarComponent!: NavbarComponent;
  sidebarVisible: boolean = false;

  constructor(private renderer: Renderer2, private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.buttonEvent.subscribe(value => this.sidebarVisible = value);
  }

  openNav() {
    this.renderer.setStyle(this.navbarComponent.sidebarNav.nativeElement, "left", "0px");
  }

}
