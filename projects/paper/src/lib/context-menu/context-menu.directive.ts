import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {fromEvent} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {OverlayConfig} from '@angular/cdk/overlay';
import {PaperReference} from '../core/paper-reference';
import {AbstractPaperDirective} from '../core/abstract-paper.directive';
import {ContextMenuFactory} from './context-menu-factory';

@Directive({
  selector: '[contextMenu]',
  exportAs: 'contextMenu'
})
export class ContextMenuDirective extends AbstractPaperDirective {

  @Input('contextMenu')
  templateReference: TemplateRef<any>;

  constructor(
    private readonly elementReference: ElementRef<HTMLElement>,
    private readonly viewContainerReference: ViewContainerRef,
    private readonly factory: ContextMenuFactory
  ) {
    super();

    fromEvent<MouseEvent>(this.elementReference.nativeElement, 'contextmenu').pipe(
      takeUntil(this.destroyed$)
    ).subscribe(event => {
      event.preventDefault();

      this.factory.updatePosition(
        this.reference,
        {
          x: event.clientX,
          y: event.clientY
        }
      );

      this.reference.attach();

      const { overlayReference } = this.reference;
      fromEvent(overlayReference.overlayElement, 'click').pipe(
        takeUntil(overlayReference.detachments())
      ).subscribe(() => {
        this.reference.detach();
      });
      fromEvent(overlayReference.overlayElement, 'contextmenu').pipe(
        takeUntil(overlayReference.detachments())
      ).subscribe(contextMenuEvent => {
        contextMenuEvent.preventDefault();
      });
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

