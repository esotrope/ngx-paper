import {Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {OverlayConfig} from '@angular/cdk/overlay';
import {Subject} from 'rxjs';
import {PaperReference} from './paper-reference';
import {PositionStrategy} from '@angular/cdk/overlay/position/position-strategy';
import {ScrollStrategy} from '@angular/cdk/overlay/scroll';
import {Direction, Directionality} from '@angular/cdk/bidi';
import {toOverlayConfig} from './overlay-config-functions';

/**
 * This class is responsible exposing the base inputs needed to compose an {@link OverlayConfig}
 * as well as managing the creation and disposal of the overlay references
 */
export abstract class AbstractPaperDirective<T extends PaperReference = PaperReference> implements OnInit, OnChanges, OnDestroy {

  @Input('cdkConnectedOverlayPositionStrategy')
  positionStrategy?: PositionStrategy;

  @Input('cdkConnectedOverlayScrollStrategy')
  scrollStrategy?: ScrollStrategy;

  @Input('cdkConnectedOverlayPanelClass')
  panelClass?: string | string[];

  @Input('cdkConnectedOverlayHasBackdrop')
  hasBackdrop?: boolean;

  @Input('cdkConnectedOverlayBackdropClass')
  backdropClass?: string | string[];

  @Input('cdkConnectedOverlayWidth')
  width?: number | string;

  @Input('cdkConnectedOverlayHeight')
  height?: number | string;

  @Input('cdkConnectedOverlayMinWidth')
  minWidth?: number | string;

  @Input('cdkConnectedOverlayMinHeight')
  minHeight?: number | string;

  @Input('cdkConnectedOverlayMaxWidth')
  maxWidth?: number | string;

  @Input('cdkConnectedOverlayMaxHeight')
  maxHeight?: number | string;

  @Input('cdkConnectedOverlayDirection')
  direction?: Direction | Directionality;

  @Input('cdkConnectedOverlayDisposeOnNavigation')
  disposeOnNavigation?: boolean;

  protected reference: PaperReference;
  protected readonly destroyed$: Subject<void> = new Subject();

  /**
   * This method should create a new panel reference specific to the directive
   *
   * @param configuration The overlay configuration based on the common inputs
   */
  protected abstract createReference(configuration: OverlayConfig): T;

  private get overlayConfiguration(): OverlayConfig {
    return toOverlayConfig(this);
  }

  ngOnInit(): void {
    this.reference = this.createReference(
      this.overlayConfiguration
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.reference != null) {
      this.reference.destroy();
      this.reference = this.createReference(
        this.overlayConfiguration
      );
    }
  }

  ngOnDestroy(): void {
    if (this.reference) {
      this.reference.destroy();
    }
  }

}
