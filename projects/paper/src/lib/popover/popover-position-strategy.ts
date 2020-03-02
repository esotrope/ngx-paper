import {PositionStrategy} from '@angular/cdk/overlay';
import {OverlayReference} from '@angular/cdk/overlay/overlay-reference';

function getOverflow(overlay: HTMLElement, origin: HTMLElement): { x: number, y: number } {
  const overflow = { x: 0, y: 0 };
  const overlayBounds = overlay.getBoundingClientRect();
  if (
    overlay.classList.contains('top')
    || overlay.classList.contains('bottom')
  ) {
    if (overlayBounds.left < 0) {
      overflow.x = overlayBounds.left;
    } else {
      // since the browser's natural behavior is to squish/wrap things when pushed up against the right bound
      // we need to get the misalignment from centers of the overlay and origin
      const originBounds = origin.getBoundingClientRect();
      const originCenterX = originBounds.left + originBounds.width * 0.5;
      const overlayCenterX = overlayBounds.left + overlayBounds.width * 0.5;
      if (Math.floor(originCenterX) !== Math.floor(overlayCenterX)) {
        overflow.x = (originCenterX - overlayCenterX) * 2;
      }
    }
  } else {
    // TODO still some issue with left, on the top center one
    if (overlayBounds.top < 0) {
      overflow.y = overlayBounds.top;
    } else {
      // const originBounds = origin.getBoundingClientRect();
      // const originCenterY = originBounds.top + originBounds.height * 0.5;
      // const overlayCenterY = overlayBounds.top + overlayBounds.height * 0.5;
      // if (Math.floor(originCenterY) !== Math.floor(overlayCenterY)) {
      //   overflow.y = (originCenterY - overlayCenterY) * 2;
      // }
    }
  }

  // overflowing the bottom of the page is not a thing - it will just introduce scroll
  return overflow;
}

export class PopoverPositionStrategy implements PositionStrategy {

  private overlayReference: OverlayReference;

  constructor(
    private origin: HTMLElement
  ) {}

  attach(
    overlayReference: OverlayReference
  ): void {
    this.overlayReference = overlayReference;
  }

  apply(): void {
    const overlay = this.overlayReference.overlayElement;
    const { style } = overlay;
    const {x, y} = getOverflow(overlay, this.origin);
    if (x !== 0) {
      const left = Number.parseInt(style.getPropertyValue('left'), 10);
      style.setProperty('left', `${left - x}px`);
      style.setProperty('--overflow-x', `${x}px`);
    }
    if (y !== 0) {
      style.setProperty('--overflow-y', `${y}px`);
    }
  }

  dispose(): void {
    this.overlayReference = null;
  }

}
