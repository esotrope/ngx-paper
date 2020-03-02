import {ConnectedPosition} from '@angular/cdk/overlay';
import {SimplePosition} from './simple-position';

export const top: ConnectedPosition = {
  overlayX: 'center',
  overlayY: 'bottom',
  originX: 'center',
  originY: 'top'
};

export const right: ConnectedPosition = {
  overlayX: 'start',
  overlayY: 'center',
  originX: 'end',
  originY: 'center'
};

export const bottom: ConnectedPosition = {
  overlayX: 'center',
  overlayY: 'top',
  originX: 'center',
  originY: 'bottom'
};

export const left: ConnectedPosition = {
  overlayX: 'end',
  overlayY: 'center',
  originX: 'start',
  originY: 'center'
};

export const connectedPositionsBySimplePosition: Map<SimplePosition, ConnectedPosition> = new Map([
  ['top', top],
  ['right', right],
  ['bottom', bottom],
  ['left', left]
]);
