import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EventService {
  constructor() { }

  public buttonEvent = new EventEmitter<boolean>();

  // clickCollapseButton(): void {
  //   this.buttonEvent.emit();
  // }
}
