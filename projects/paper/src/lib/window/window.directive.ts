import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {PaperReference} from '../core/paper-reference';
import {fromEvent} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AbstractPaperDirective} from '../core/abstract-paper.directive';
import {OverlayConfig} from '@angular/cdk/overlay';
import {WindowFactory} from './window-factory';

@Directive({
  selector: '[window]',
  exportAs: 'window'
})
export class WindowDirective extends AbstractPaperDirective {

  @Input('window')
  templateReference: TemplateRef<any>;

  constructor(
    private readonly elementReference: ElementRef<HTMLElement>,
    private readonly viewContainerReference: ViewContainerRef,
    private readonly factory: WindowFactory,
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
        overlayConfiguration
      },
      this.viewContainerReference
    );
  }

}
