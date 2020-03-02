import {Injectable, Injector, TemplateRef, ViewContainerRef} from '@angular/core';
import {ComponentType, ConnectionPositionPair, Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {PaperTemplateContext} from '../core/paper-template-context';
import {PaperConfiguration} from '../core/paper-configuration';
import {Directionality} from '@angular/cdk/bidi';
import {mergeOverlayConfig} from '../core/overlay-config-functions';
import {PaperReference} from '../core/paper-reference';
import {CONTEXT_MENU_DATA} from './context-menu-tokens';
import {Point} from '@angular/cdk/drag-drop/drag-ref';
import {portalFactory} from '../core/paper-functions';

const panelClass = 'context-menu';
const positions: ConnectionPositionPair[] = [
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top'
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom'
  }
];

/**
 * Factory responsible for creating context menus
 */
@Injectable({
  providedIn: 'root'
})
export class ContextMenuFactory {

  constructor(
    private injector: Injector,
    private overlay: Overlay
  ) {}

  /**
   * Creates a panel references with modal behavior presets
   * @param componentOrTemplate The component or template to render inside the modal
   * @param configuration The modal configuration
   * @param viewContainerReference View container reference needed for rendering templates
   */
  create<T extends ComponentType<any> = ComponentType<any>, D = any>(
    componentOrTemplate: T | TemplateRef<PaperTemplateContext<T, D>>,
    configuration: PaperConfiguration<D> = {},
    viewContainerReference?: ViewContainerRef
  ): PaperReference<T, D> {

    // protect against explicit null
    configuration = configuration || {};

    const direction = this.injector.get(Directionality, null);

    const scrollStrategy = this.overlay.scrollStrategies.block();
    const defaultConfiguration = new OverlayConfig({
      direction,
      scrollStrategy,
      panelClass
    });

    return new PaperReference(
      portalFactory(
        componentOrTemplate,
        CONTEXT_MENU_DATA,
        configuration.data,
        viewContainerReference,
        this.injector
      ),
      {
        ...configuration,
        closeOnOutsideClick: true,
        overlayConfiguration: mergeOverlayConfig(
          defaultConfiguration,
          configuration.overlayConfiguration || {}
        )
      },
      this.injector
    );
  }

  updatePosition(reference: PaperReference, point: Point): void {
    reference.overlayReference.updatePositionStrategy(
      this.overlay.position()
        .flexibleConnectedTo(point)
        .withPush(true)
        .withFlexibleDimensions(false)
        .withPositions(positions)
    );
  }

}
