import {OverlayConfig} from '@angular/cdk/overlay';

export interface PaperConfiguration<T = any> {
  overlayConfiguration?: OverlayConfig;
  data?: T;
  closeOnOutsideClick?: boolean;
}
