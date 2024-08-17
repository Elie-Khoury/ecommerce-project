import { AfterViewInit, Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAddClassIfRequired]'
})
export class AddClassIfRequiredDirective implements AfterViewInit {

  @Input() appAddClassIfRequired!: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngAfterViewInit(): void {
    this.applyClass();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appAddClassIfRequired']) {
      this.applyClass();
    }
  }

  private applyClass(): void {
    if (this.appAddClassIfRequired.trim() === 'required*') {
      this.renderer.addClass(this.el.nativeElement, 'required-class');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'required-class');
    }
  }
}
