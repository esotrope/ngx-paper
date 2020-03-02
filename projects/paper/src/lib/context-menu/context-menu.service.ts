import {Injectable, TemplateRef, ViewContainerRef} from '@angular/core';
import {PaperTemplateContext} from '../core/paper-template-context';
import {PaperConfiguration} from '../core/paper-configuration';
import {PaperReference} from '../core/paper-reference';
import {Point} from '@angular/cdk/drag-drop/drag-ref';
import {ContextMenuFactory} from './context-menu-factory';

/**
 * Service responsible for creating and opening context menus
 */
@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  constructor(
    private factory: ContextMenuFactory
  ) {}

  /**
   * Creates panel references with context menu behavior presets
   * @param template The component or template to render inside the context menu
   * @param point at which the menu was opened
   * @param configuration The context menu configuration
   * @param viewContainerReference at which the menu was opened
   */
  open<D = any>(
    template: TemplateRef<PaperTemplateContext<any, D>>,
    point: Point,
    configuration: PaperConfiguration<D> = {},
    viewContainerReference?: ViewContainerRef
  ): PaperReference<any, D> {
    const reference = this.factory.create(
      template,
      configuration,
      viewContainerReference
    );
    this.factory.updatePosition(reference, point);
    reference.attach();
    return reference;
  }

}
