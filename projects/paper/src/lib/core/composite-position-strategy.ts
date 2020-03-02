import {PositionStrategy} from '@angular/cdk/overlay';
import {OverlayReference} from '@angular/cdk/overlay/overlay-reference';

/**
 * Applies all position strategies provided in the order provided
 */
export class CompositePositionStrategy implements PositionStrategy {

  constructor(
    private readonly strategies: PositionStrategy[] = []
  ) {}

  attach(overlayReference: OverlayReference): void {
    this.strategies.forEach(strategy => {
      strategy.attach(overlayReference);
    });
  }

  apply(): void {
    this.strategies.forEach(strategy => {
      strategy.apply();
    });
  }

  detach(): void {
    this.strategies.forEach(strategy => {
      if (strategy.detach != null) {
        strategy.detach();
      }
    });
  }

  dispose(): void {
    this.strategies.forEach(strategy => {
      strategy.dispose();
    });
  }
}
