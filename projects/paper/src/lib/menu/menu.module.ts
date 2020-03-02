import {NgModule} from '@angular/core';
import {CoreModule} from '../core/core.module';
import {MenuDirective} from './menu.directive';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    MenuDirective
  ],
  exports: [
    MenuDirective
  ]
})
export class MenuModule {}
