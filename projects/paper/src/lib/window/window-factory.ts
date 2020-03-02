import {ElementRef, Injectable, Injector, TemplateRef, ViewContainerRef} from '@angular/core';
import {ComponentType, ConnectionPositionPair, Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {mergeOverlayConfig} from '../core/overlay-config-functions';
import {Directionality} from '@angular/cdk/bidi';
import {PaperTemplateContext} from '../core/paper-template-context';
import {PaperConfiguration} from '../core/paper-configuration';
import {PaperReference} from '../core/paper-reference';
import {portalFactory} from '../core/paper-functions';
import {WINDOW_DATA} from './window-tokens';

const panelClass = 'window';
const positions: ConnectionPositionPair[] = [
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
  },
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top'
  }
];

/**
 * Factory responsible for creating windows
 */
@Injectable({
  providedIn: 'root'
})
export class WindowFactory {

  constructor(
    private readonly injector: Injector,
    private readonly overlay: Overlay
  ) {}

  /**
   * Creates a panel references with modal behavior presets
   * @param componentOrTemplate The component or template to render inside the modal
   * @param origin The wubdiw trigger
   * @param configuration The modal configuration
   * @param viewContainerReference The view container to render the template in
   */
  create<T extends ComponentType<any> = ComponentType<any>, D = any>(
    componentOrTemplate: T | TemplateRef<PaperTemplateContext<T, D>>,
    origin?: HTMLElement | ElementRef<HTMLElement>,
    configuration: PaperConfiguration<D> = {},
    viewContainerReference?: ViewContainerRef
  ): PaperReference<T, D> {

    // protect against explicit null
    configuration = configuration || {};

    const direction = this.injector.get(Directionality);

    const positionStrategy = origin != null
      ? this.overlay.position()
        .flexibleConnectedTo(origin)
        .withPositions(positions)
        .withFlexibleDimensions(true)
        .withPush(true)
      : this.overlay.position()
        .global()
        .centerHorizontally();

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    const defaultConfiguration = new OverlayConfig({
      direction,
      positionStrategy,
      scrollStrategy,
      panelClass
    });

    return new PaperReference(
      portalFactory(
        componentOrTemplate,
        WINDOW_DATA,
        configuration.data,
        viewContainerReference,
        this.injector
      ),
      {
        ...configuration,
        overlayConfiguration: mergeOverlayConfig(
          defaultConfiguration,
          configuration.overlayConfiguration || {}
        )
      },
      this.injector
    );
  }

}
