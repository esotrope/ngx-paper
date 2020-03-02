import {NgModule} from '@angular/core';
import {CoreModule} from '../core/core.module';
import {ContextMenuDirective} from './context-menu.directive';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    ContextMenuDirective
  ],
  exports: [
    ContextMenuDirective
  ]
})
export class ContextMenuModule {}
