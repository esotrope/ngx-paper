import {PaperConfiguration} from '../core/paper-configuration';
import {SimplePosition} from '../core/simple-position';

export interface PopoverConfiguration<T = any> extends PaperConfiguration<T> {
  primaryPosition?: SimplePosition;
}
