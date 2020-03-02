import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {
  ContextMenuModule,
  KeyboardNavigableListModule,
  MenuModule,
  ModalModule,
  PopoverModule,
  WindowModule
} from '../../../paper/src/public-api';
import {PopoverSectionComponent} from './popover-section/popover-section.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalSectionComponent} from './modal-section/modal-section.component';
import {ExampleModalComponent} from './modal-section/example-modal/example-modal.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ContextMenuModule,
    PopoverModule,
    MenuModule,
    ModalModule,
    KeyboardNavigableListModule,
    WindowModule,
    DragDropModule
  ],
  declarations: [
    AppComponent,
    ExampleModalComponent,
    PopoverSectionComponent,
    ModalSectionComponent
  ],
  entryComponents: [
    ExampleModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
