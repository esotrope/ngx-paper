import {NgModule} from '@angular/core';
import {KeyboardNavigableListDirective} from './keyboard-navigable-list.directive';
import {KeyboardNavigableListItemDirective} from './keyboard-navigable-list-item.directive';

@NgModule({
  imports: [],
  declarations: [
    KeyboardNavigableListDirective,
    KeyboardNavigableListItemDirective
  ],
  exports: [
    KeyboardNavigableListDirective,
    KeyboardNavigableListItemDirective
  ]
})
export class KeyboardNavigableListModule {}
