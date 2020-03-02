import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {ConnectedPosition, OverlayConfig} from '@angular/cdk/overlay';
import {dropDownRight} from './menu-drop-positions';
import {AbstractPaperDirective} from '../core/abstract-paper.directive';
import {PaperReference} from '../core/paper-reference';
import {fromEvent} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MenuFactory} from './menu-factory';

@Directive({
  selector: '[menu]',
  exportAs: 'menu'
})
export class MenuDirective extends AbstractPaperDirective {

  @Input('menu')
  templateReference: TemplateRef<any>;

  @Input('menuPrimaryPosition')
  primaryPosition: ConnectedPosition = dropDownRight;

  constructor(
    private readonly elementReference: ElementRef<HTMLElement>,
    private readonly viewContainerReference: ViewContainerRef,
    private readonly factory: MenuFactory,
  ) {
    super();

    fromEvent(this.elementReference.nativeElement, 'click').pipe(
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.reference.toggle();
    });
  }

  protected createReference(overlayConfiguration: OverlayConfig): PaperReference {
    return this.factory.create(
      this.templateReference,
      this.elementReference,
      {
        overlayConfiguration,
        primaryPosition: this.primaryPosition
      },
      this.viewContainerReference
    );
  }

}
