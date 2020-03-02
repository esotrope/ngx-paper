import {Directive, ElementRef} from '@angular/core';
import {FocusableOption, Highlightable, ListKeyManagerOption} from '@angular/cdk/a11y';
import {FocusOrigin} from '@angular/cdk/a11y/focus-monitor/focus-monitor';

@Directive({
  selector: '[keyboardNavigableListItem]',
  exportAs: 'keyboardNavigableListItem'
})
export class KeyboardNavigableListItemDirective implements FocusableOption, ListKeyManagerOption, Highlightable {

  constructor(
    public elementReference: ElementRef<HTMLElement>
  ) {}

  get element(): HTMLElement {
    return this.elementReference.nativeElement;
  }

  focus(origin?: FocusOrigin): void {
    this.element.focus();
  }

  get disabled(): boolean {
    return this.element.classList.contains('disabled')
      || (
        this.element.hasAttribute('disabled')
        && this.element.getAttribute('disabled') !== 'false'
      );
  }

  getLabel(): string {
    return this.element.textContent;
  }

  setActiveStyles(): void {
    this.element.classList.add('active');
  }

  setInactiveStyles(): void {
    this.element.classList.remove('active');
  }

}
