import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2, TemplateRef } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective  {

  @Input() elementRef!: HTMLElement;
  private toggleClick: boolean = false;

  constructor(private eleRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click')
  onClick() {
    this.toggleClick = !this.toggleClick;
    if (this.elementRef) {
      this.addOrRemoveClass(this.elementRef);
    } else {
      this.addOrRemoveClass(this.eleRef)
    }

  }
  addOrRemoveClass(elementRef: HTMLElement | ElementRef<HTMLElement>) {
    if(this.toggleClick) this.renderer.addClass(elementRef, "show");
    else this.renderer.removeClass(elementRef, "show");
  }
}
