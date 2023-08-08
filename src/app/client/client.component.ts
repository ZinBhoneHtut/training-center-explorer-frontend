import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  
  testing: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.testing = false;
  }

}
