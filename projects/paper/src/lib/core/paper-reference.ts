import {ComponentRef, EmbeddedViewRef, Injector} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {ComponentType, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {hasModifierKey} from '@angular/cdk/keycodes';
import {ComponentPortal, TemplatePortal} from '@angular/cdk/portal';
import {FocusTrap, FocusTrapFactory} from '@angular/cdk/a11y';
import {PaperTemplateContext} from './paper-template-context';
import {DragDrop} from '@angular/cdk/drag-drop';
import {PaperConfiguration} from './paper-configuration';

export class PaperReference<
  T extends ComponentType<any> = ComponentType<any>,
  D = any
> {

  protected reference: OverlayRef;
  private previouslyFocusedElement: HTMLElement;
  private attachmentReference: ComponentRef<T> | EmbeddedViewRef<PaperTemplateContext<T, D>>;
  private readonly focusTrap: FocusTrap;
  private readonly destroyed$: Subject<void> = new Subject();

  constructor(
    private readonly factory: (reference: PaperReference) => ComponentPortal<T> | TemplatePortal<PaperTemplateContext<T, D>>,
    private readonly paperConfiguration: PaperConfiguration<D>,
    private readonly injector: Injector
  ) {

    const overlay = injector.get(Overlay);
    const focusTrapFactory = injector.get(FocusTrapFactory);

    this.reference = overlay.create(paperConfiguration.overlayConfiguration);
    this.focusTrap = focusTrapFactory.create(
      this.reference.overlayElement,
      true
    );
  }

  get instance(): any {
    if (this.attachmentReference != null && this.attachmentReference instanceof ComponentRef) {
      return (this.attachmentReference as ComponentRef<any>).instance;
    }
  }

  get context(): PaperTemplateContext<T, D> {
    if (this.attachmentReference != null && this.attachmentReference instanceof EmbeddedViewRef) {
      return (this.attachmentReference as EmbeddedViewRef<any>).context;
    }
  }

  get configuration(): OverlayConfig {
    return this.paperConfiguration.overlayConfiguration;
  }

  get overlayReference(): OverlayRef {
    return this.reference;
  }

  get attached(): boolean {
    return this.reference != null
      && this.reference.hasAttached();
  }

  toggle(): void {
    this.attached
      ? this.detach()
      : this.attach();
  }

  attach(): void {
    if (this.attached) {
      return;
    }
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    this.attachmentReference = this.reference.attach(this.factory(this));

    // this.focusTrap.attachAnchors();
    this.focusTrap.focusInitialElementWhenReady().then(() => {
      this.focusTrap.attachAnchors();
    });

    this.reference.keydownEvents().pipe(
      takeUntil(this.reference.detachments())
    ).subscribe((event: KeyboardEvent) => {
      if (event.key === 'Escape' && !hasModifierKey(event)) {
        event.preventDefault();
        this.detach();
      }
    });

    if (this.paperConfiguration.closeOnOutsideClick) {
      if (this.reference.getConfig().hasBackdrop) {
        this.reference.backdropClick().pipe(
          takeUntil(this.reference.detachments())
        ).subscribe(() => {
          this.detach();
        });
      } else {
        setTimeout(() => {
          fromEvent(document, 'click').pipe(
            filter(event =>
              !this.reference.overlayElement.contains(event.target as HTMLElement)
            ),
            takeUntil(this.reference.detachments())
          ).subscribe(() => {
            this.detach();
          });
        });
      }
    }
  }

  detach(): void {
    if (
      this.attached
      && this.reference != null
    ) {
      if (this.previouslyFocusedElement != null) {
        this.previouslyFocusedElement.focus();
        this.previouslyFocusedElement = null;
      }
      this.reference.detach();
    }
  }

  destroy(): void {
    if (this.focusTrap != null) {
      this.focusTrap.destroy();
    }
    if (this.reference != null) {
      this.reference.dispose();
    }
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
