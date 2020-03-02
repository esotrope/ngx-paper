import {NgModule} from '@angular/core';
import {CoreModule} from '../core/core.module';
import {WindowDirective} from './window.directive';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    WindowDirective
  ],
  exports: [
    WindowDirective
  ]
})
export class WindowModule {}
