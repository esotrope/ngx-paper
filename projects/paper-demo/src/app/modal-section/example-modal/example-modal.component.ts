import {Component, Inject, Input, OnInit} from '@angular/core';
import {PaperReference} from '../../../../../paper/src/lib/core/paper-reference';
import {MODAL_DATA} from '../../../../../paper/src/lib/modal/modal-tokens';

@Component({
  selector: 'app-example-modal',
  templateUrl: './example-modal.component.html',
  styleUrls: ['./example-modal.component.scss']
})
export class ExampleModalComponent {

  @Input()
  head: string;

  @Input()
  body: string;

  constructor(
    readonly reference: PaperReference,
    @Inject(MODAL_DATA) public data: any,
  ) {}

}
