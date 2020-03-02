import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {SimplePosition} from '../core/simple-position';
import {AbstractPaperDirective} from '../core/abstract-paper.directive';
import {fromEvent} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {OverlayConfig} from '@angular/cdk/overlay';
import {PaperReference} from '../core/paper-reference';
import {PopoverFactory} from './popover-factory';

@Directive({
  selector: '[popover]',
  exportAs: 'popover'
})
export class PopoverDirective extends AbstractPaperDirective {

  @Input('popover')
  templateReference: TemplateRef<any>;

  @Input('popoverPrimaryPosition')
  primaryPosition: SimplePosition = 'top';

  constructor(
    private readonly elementReference: ElementRef<HTMLElement>,
    private readonly viewContainerReference: ViewContainerRef,
    private readonly factory: PopoverFactory,
  ) {
    super();

    fromEvent(this.elementReference.nativeElement, 'click').pipe(
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.reference.toggle();
    });
  }

  get popoverReference(): PaperReference {
    return this.reference;
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
