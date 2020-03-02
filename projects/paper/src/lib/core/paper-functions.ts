import {InjectionToken, Injector, TemplateRef, ViewContainerRef} from '@angular/core';
import {ComponentPortal, PortalInjector, TemplatePortal} from '@angular/cdk/portal';
import {PaperReference} from './paper-reference';
import {PaperTemplateContext} from './paper-template-context';
import {ComponentType} from '@angular/cdk/overlay';

export function portalFactory<T extends ComponentType<any> = ComponentType<any>, D = any>(
  componentOrTemplate: T | TemplateRef<PaperTemplateContext<T, D>>,
  dataToken: InjectionToken<any>,
  data?: D,
  viewContainerReference?: ViewContainerRef,
  injector?: Injector
): (reference: PaperReference<T, D>) => ComponentPortal<T> | TemplatePortal<PaperTemplateContext<T, D>> {
  return reference => componentOrTemplate instanceof TemplateRef
    ? new TemplatePortal(
        componentOrTemplate,
        viewContainerReference,
        {
          $implicit: reference
        }
      )
    : new ComponentPortal(
        componentOrTemplate,
        viewContainerReference,
        new PortalInjector(
          injector,
          new WeakMap<any, any>([
            [PaperReference, reference],
            [dataToken, typeof data === 'undefined' ? {} : data]
          ])
        )
      );
}
