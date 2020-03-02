import {NgModule} from '@angular/core';
import {CoreModule} from '../core/core.module';
import {ModalDirective} from './modal.directive';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    ModalDirective
  ],
  exports: [
    ModalDirective
  ]
})
export class ModalModule {}
