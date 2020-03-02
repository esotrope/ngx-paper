import {Injectable, Injector, TemplateRef, ViewContainerRef} from '@angular/core';
import {ComponentType, Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {MODAL_DATA} from './modal-tokens';
import {mergeOverlayConfig} from '../core/overlay-config-functions';
import {Directionality} from '@angular/cdk/bidi';
import {PaperTemplateContext} from '../core/paper-template-context';
import {PaperConfiguration} from '../core/paper-configuration';
import {PaperReference} from '../core/paper-reference';
import {portalFactory} from '../core/paper-functions';

/**
 * Factory responsible for creating modals
 */
@Injectable({
  providedIn: 'root'
})
export class ModalFactory {

  constructor(
    private readonly injector: Injector,
    private readonly overlay: Overlay
  ) {}

  /**
   * Creates a panel references with modal behavior presets
   * @param componentOrTemplate The component or template to render inside the modal
   * @param configuration The modal configuration
   * @param viewContainerReference The view container to render the template in
   */
  create<T extends ComponentType<any> = ComponentType<any>, D = any>(
    componentOrTemplate: T | TemplateRef<PaperTemplateContext<T, D>>,
    configuration: PaperConfiguration<D> = {},
    viewContainerReference?: ViewContainerRef
  ): PaperReference<T, D> {

    // protect against explicit null
    configuration = configuration || {};

    const direction = this.injector.get(Directionality);

    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally();

    const scrollStrategy = this.overlay.scrollStrategies.block();

    const defaultConfiguration = new OverlayConfig({
      direction,
      positionStrategy,
      scrollStrategy,
      panelClass: 'modal',
      hasBackdrop: true
    });

    return new PaperReference(
      portalFactory(
        componentOrTemplate,
        MODAL_DATA,
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
