import {ConnectedPosition} from '@angular/cdk/overlay';

export const dropDownRight: ConnectedPosition =   {
  originX: 'start',
  originY: 'bottom',
  overlayX: 'start',
  overlayY: 'top'
};

export const dropDownLeft: ConnectedPosition = {
  originX: 'end',
  originY: 'bottom',
  overlayX: 'end',
  overlayY: 'top'
};

export const dropUpRight: ConnectedPosition = {
  originX: 'start',
  originY: 'top',
  overlayX: 'start',
  overlayY: 'bottom'
};

export const dropUpLeft: ConnectedPosition = {
  originX: 'end',
  originY: 'top',
  overlayX: 'end',
  overlayY: 'bottom'
};

export const dropLeftDown: ConnectedPosition = {
  originX: 'start',
  originY: 'top',
  overlayX: 'end',
  overlayY: 'top'
};

export const dropLeftUp: ConnectedPosition = {
  originX: 'start',
  originY: 'bottom',
  overlayX: 'end',
  overlayY: 'bottom'
};

export const dropRightDown: ConnectedPosition = {
  originX: 'end',
  originY: 'top',
  overlayX: 'start',
  overlayY: 'top'
};

export const dropRightUp: ConnectedPosition = {
  originX: 'end',
  originY: 'bottom',
  overlayX: 'start',
  overlayY: 'bottom'
};
