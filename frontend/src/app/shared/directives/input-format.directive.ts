import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input') onInput() {
    let value = this.el.nativeElement.value;
    this.el.nativeElement.value = value.replace(/\D/g, '');
  }
}
