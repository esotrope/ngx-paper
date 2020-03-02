import {PaperReference} from './paper-reference';
import {ComponentType} from '@angular/cdk/overlay';

export interface PaperTemplateContext<
  T extends ComponentType<any> = ComponentType<any>,
  D = any
> {
  readonly data?: D;
  readonly $implicit: PaperReference<T, D>;
}
