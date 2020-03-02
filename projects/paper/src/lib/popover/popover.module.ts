import {NgModule} from '@angular/core';
import {PopoverDirective} from './popover.directive';
import {CoreModule} from '../core/core.module';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    PopoverDirective
  ],
  exports: [
    PopoverDirective
  ]
})
export class PopoverModule {}
