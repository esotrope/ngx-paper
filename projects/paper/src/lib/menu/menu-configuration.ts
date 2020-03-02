import {PaperConfiguration} from '../core/paper-configuration';
import {ConnectedPosition} from '@angular/cdk/overlay';

export interface MenuConfiguration<T = any> extends PaperConfiguration<T> {
  primaryPosition?: ConnectedPosition;
}
