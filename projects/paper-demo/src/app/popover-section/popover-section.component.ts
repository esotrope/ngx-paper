import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PopoverDirective} from '../../../../paper/src/lib/popover/popover.directive';

@Component({
  selector: 'app-popover-section',
  templateUrl: './popover-section.component.html',
  styleUrls: ['./popover-section.component.scss']
})
export class PopoverSectionComponent {

  @ViewChildren(PopoverDirective)
  popoverDirectives: QueryList<PopoverDirective>;

  formGroup: FormGroup = new FormGroup({
    position: new FormControl('top')
  });

  onToggleAllButtonClick(): void {
    this.popoverDirectives.forEach(directive => {
      directive.popoverReference.toggle();
    });
  }

  getStyle(i: number): any {
    const alignment = [1, 2, 3].includes(i)
      ? 'top'
      : [4, 5, 6].includes(i)
        ? 'center'
        : 'bottom';

    const justification = [1, 4, 7].includes(i)
      ? 'left'
      : [2, 5, 8].includes(i)
        ? 'center'
        : 'right';

    return {
      'align-self': alignment,
      'justify-self': justification,
    };
  }

}
