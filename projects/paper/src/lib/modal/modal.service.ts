import {Injectable, TemplateRef, ViewContainerRef} from '@angular/core';
import {ComponentType} from '@angular/cdk/overlay';
import {PaperTemplateContext} from '../core/paper-template-context';
import {PaperConfiguration} from '../core/paper-configuration';
import {PaperReference} from '../core/paper-reference';
import {ModalFactory} from './modal-factory';

/**
 * Service responsible for creating and opening modals
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private factory: ModalFactory
  ) {}

  /**
   * Creates panel references with modal behavior presets
   * @param componentOrTemplate The component or template to render inside the modal
   * @param configuration The modal configuration
   * @param viewContainerReference The view container to render the template in
   */
  open<T extends ComponentType<any> = ComponentType<any>, D = any>(
    componentOrTemplate: T | TemplateRef<PaperTemplateContext<T, D>>,
    configuration: PaperConfiguration<D> = {},
    viewContainerReference?: ViewContainerRef
  ): PaperReference<T, D> {
    const reference = this.factory.create(
      componentOrTemplate,
      configuration,
      viewContainerReference
    );
    reference.attach();
    return reference as any;
  }

}
