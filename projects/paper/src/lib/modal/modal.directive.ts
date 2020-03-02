import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {PaperReference} from '../core/paper-reference';
import {fromEvent} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AbstractPaperDirective} from '../core/abstract-paper.directive';
import {OverlayConfig} from '@angular/cdk/overlay';
import {ModalFactory} from './modal-factory';

@Directive({
  selector: '[modal]',
  exportAs: 'modal'
})
export class ModalDirective extends AbstractPaperDirective {

  @Input('modal')
  templateReference: TemplateRef<any>;

  constructor(
    private readonly elementReference: ElementRef<HTMLElement>,
    private readonly viewContainerReference: ViewContainerRef,
    private readonly factory: ModalFactory,
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
      {
        overlayConfiguration
      },
      this.viewContainerReference
    );
  }

}
