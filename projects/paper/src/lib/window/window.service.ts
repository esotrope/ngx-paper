import {ElementRef, Injectable, TemplateRef, ViewContainerRef} from '@angular/core';
import {ComponentType} from '@angular/cdk/overlay';
import {PaperTemplateContext} from '../core/paper-template-context';
import {PaperConfiguration} from '../core/paper-configuration';
import {PaperReference} from '../core/paper-reference';
import {WindowFactory} from './window-factory';

/**
 * Service responsible for creating and opening modals
 */
@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor(
    private factory: WindowFactory
  ) {}

  /**
   * Creates panel references with modal behavior presets
   * @param componentOrTemplate The component or template to render inside the modal
   * @param origin The window trigger
   * @param configuration The modal configuration
   * @param viewContainerReference The view container to render the template in
   */
  open<T extends ComponentType<any> = ComponentType<any>, D = any>(
    componentOrTemplate: T | TemplateRef<PaperTemplateContext<T, D>>,
    origin: HTMLElement | ElementRef<HTMLElement>,
    configuration: PaperConfiguration<D> = {},
    viewContainerReference?: ViewContainerRef
  ): PaperReference<T, D> {
    const reference = this.factory.create(
      componentOrTemplate,
      origin,
      configuration,
      viewContainerReference
    );
    reference.attach();
    return reference as any;
  }

}
