import {OverlayConfig} from '@angular/cdk/overlay';

export function stringOrStringsToArray(value: string | string[]): string[] {
  return typeof value === 'string'
    ? [value]
    : Array.isArray(value)
      ? value
      : [];
}

export function mergeOverlayConfig(a: OverlayConfig, b: OverlayConfig): OverlayConfig {
  return {
    ...a,
    ...b,
    panelClass: [
      ...stringOrStringsToArray(a.panelClass),
      ...stringOrStringsToArray(b.panelClass)
    ],
    backdropClass: [
      ...stringOrStringsToArray(a.backdropClass),
      ...stringOrStringsToArray(b.backdropClass)
    ]
  };
}

export function toOverlayConfig(source: any): OverlayConfig {
  const {
    positionStrategy,
    scrollStrategy,
    panelClass,
    hasBackdrop,
    backdropClass,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    direction,
    disposeOnNavigation
  } = source;

  return Object.entries({
    positionStrategy,
    scrollStrategy,
    panelClass,
    hasBackdrop,
    backdropClass,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    direction,
    disposeOnNavigation
  }).reduce((config: any, [key, value]) => {
    if (value == null) {
      delete config[key];
    } else {
      config[key] = value;
    }
    return config;
  }, new OverlayConfig());

}
