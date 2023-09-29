import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EventService {
  constructor() { }

  public buttonEvent = new EventEmitter<boolean>();

  openSideBar(): void {
    this.buttonEvent.emit(true);
  }

  closeSideBar(): void {
    this.buttonEvent.emit(false);
  }

}
