import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import {FocusKeyManager, ListKeyManager, ListKeyManagerModifierKey} from '@angular/cdk/a11y';
import {takeUntil} from 'rxjs/operators';
import {fromEvent, Subject} from 'rxjs';
import {KeyboardNavigableListItemDirective} from './keyboard-navigable-list-item.directive';

@Directive({
  selector: '[keyboardNavigableList]',
  exportAs: 'keyboardNavigableList'
})
export class KeyboardNavigableListDirective implements AfterContentInit, OnChanges, OnDestroy {

  @Input('keyboardListWrap')
  wrap: boolean = true;

  @Input('keyboardListVerticalOrientation')
  verticalOrientation: boolean = true;

  @Input('keyboardListHorizontalOrientation')
  horizontalOrientation?: 'ltr' | 'rtl';

  @Input('keyboardListAllowedModifierKeys')
  allowedModifierKeys?: ListKeyManagerModifierKey[];

  @Input('keyboardListTypeahead')
  typeahead?: number;

  @Output()
  keyboardListItemSelected: EventEmitter<KeyboardNavigableListItemDirective> = new EventEmitter();

  @ContentChildren(KeyboardNavigableListItemDirective, {descendants: true})
  contentChildren: QueryList<KeyboardNavigableListItemDirective>;

  private listKeyManager: ListKeyManager<KeyboardNavigableListItemDirective>;
  private readonly destroyed$: Subject<void> = new Subject();

  constructor(
    private elementReference: ElementRef<HTMLElement>
  ) {}

  ngAfterContentInit(): void {
    this.listKeyManager = this.createListKeyManager();
    this.listKeyManager.setFirstItemActive();

    fromEvent<KeyboardEvent>(
      this.elementReference.nativeElement,
      'keydown'
    ).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(event => {
      if (event.key === 'Tab') {
        // Keeps the list key manager in sync
        // why this is necessary i'm not sure...
        setTimeout(() => {
          this.listKeyManager.setActiveItem(
            this.contentChildren.toArray().findIndex(x =>
              x.elementReference.nativeElement === document.activeElement
            )
          )
        });
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        this.listKeyManager.onKeydown(event);
      }
    });
  }

  ngOnChanges(): void {
    if (this.listKeyManager != null) {
      this.listKeyManager = this.createListKeyManager();
      this.listKeyManager.setFirstItemActive();
    }
  }

  ngOnDestroy(): void {
    this.keyboardListItemSelected.complete();
    this.listKeyManager = null;
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private createListKeyManager(): ListKeyManager<KeyboardNavigableListItemDirective> {
    return new FocusKeyManager(this.contentChildren)
      .withWrap(this.wrap)
      .withVerticalOrientation(this.verticalOrientation)
      .withHorizontalOrientation(this.horizontalOrientation)
      .withAllowedModifierKeys(this.allowedModifierKeys)
      .withTypeAhead(this.typeahead);
  }
}
