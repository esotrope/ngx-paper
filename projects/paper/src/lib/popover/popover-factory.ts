import {ElementRef, Injectable, Injector, TemplateRef, ViewContainerRef} from '@angular/core';
import {ComponentType, Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {mergeOverlayConfig} from '../core/overlay-config-functions';
import {Directionality} from '@angular/cdk/bidi';
import {PaperTemplateContext} from '../core/paper-template-context';
import {PaperReference} from '../core/paper-reference';
import {portalFactory} from '../core/paper-functions';
import {connectedPositionsBySimplePosition} from '../core/simple-connected-positions';
import {CompositePositionStrategy} from '../core/composite-position-strategy';
import {PopoverPositionStrategy} from './popover-position-strategy';
import {SimplePosition} from '../core/simple-position';
import {PopoverConfiguration} from './popover-configuration';
import {POPOVER_DATA} from './popover-tokens';

const panelClass = 'popover';
const defaultPositions: SimplePosition[] = ['top', 'bottom'];

/**
 * Factory responsible for creating popovers
 */
@Injectable({
  providedIn: 'root'
})
export class PopoverFactory {

  constructor(
    private readonly injector: Injector,
    private readonly overlay: Overlay
  ) {}

  /**
   * Creates a panel references with modal behavior presets
   * @param componentOrTemplate The component or template to render inside the modal
   * @param origin The popover trigger
   * @param configuration The modal configuration
   * @param viewContainerReference The view container to render the template in
   */
  create<T extends ComponentType<any> = ComponentType<any>, D = any>(
    componentOrTemplate: T | TemplateRef<PaperTemplateContext<T, D>>,
    origin: HTMLElement | ElementRef<HTMLElement>,
    configuration: PopoverConfiguration<D> = {},
    viewContainerReference?: ViewContainerRef
  ): PaperReference<T, D> {

    // protect against explicit null
    configuration = configuration || {};

    const direction = this.injector.get(Directionality);

    const positions = [
      configuration.primaryPosition || 'top',
      ...defaultPositions
    ].map(simplePosition => ({
      ...connectedPositionsBySimplePosition.get(simplePosition),
      panelClass: [simplePosition]
    }));

    const positionStrategy = new CompositePositionStrategy([
      this.overlay.position()
        .flexibleConnectedTo(origin)
        .withPush(false)
        .withFlexibleDimensions(false)
        .withLockedPosition(true)
        .withPositions(positions),
      new PopoverPositionStrategy(
        origin instanceof ElementRef
          ? origin.nativeElement
          : origin
      )
    ]);

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
        POPOVER_DATA,
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

}
