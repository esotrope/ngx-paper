import {ElementRef, Injectable, Injector, TemplateRef, ViewContainerRef} from '@angular/core';
import {ComponentType, ConnectionPositionPair, Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {PaperTemplateContext} from '../core/paper-template-context';
import {PaperReference} from '../core/paper-reference';
import {Directionality} from '@angular/cdk/bidi';
import {mergeOverlayConfig} from '../core/overlay-config-functions';
import {
  dropDownLeft,
  dropDownRight,
  dropLeftDown,
  dropLeftUp,
  dropRightDown,
  dropRightUp,
  dropUpLeft,
  dropUpRight
} from './menu-drop-positions';
import {MenuConfiguration} from './menu-configuration';
import {MENU_DATA} from './menu-tokens';
import {portalFactory} from '../core/paper-functions';

const panelClass = 'menu';
const menuDropPositions: ConnectionPositionPair[] = [
  dropDownLeft,
  dropDownRight,
  dropUpLeft,
  dropUpRight,
  dropLeftDown,
  dropLeftUp,
  dropRightDown,
  dropRightUp
];


/**
 * Factory responsible for creating menus
 */
@Injectable({
  providedIn: 'root'
})
export class MenuFactory {

  constructor(
    private readonly injector: Injector,
    private readonly overlay: Overlay
  ) {}

  /**
   * Creates a panel references with menu behavior presets
   * @param componentOrTemplate The component or template to render inside the menu
   * @param origin The menu trigger
   * @param configuration The menu configuration
   * @param viewContainerReference The view container to render the template in
   */
  create<T extends ComponentType<any> = ComponentType<any>, D = any>(
    componentOrTemplate: T | TemplateRef<PaperTemplateContext<T, D>>,
    origin: HTMLElement | ElementRef<HTMLElement>,
    configuration: MenuConfiguration<D> = {},
    viewContainerReference?: ViewContainerRef
  ): PaperReference<T, D> {

    // protect against explicit null
    configuration = configuration || {};

    const direction = this.injector.get(Directionality);

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(origin)
      .withPush(false)
      .withFlexibleDimensions(false)
      .withPositions([
        configuration.primaryPosition,
        ...menuDropPositions
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
        MENU_DATA,
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
