import {Component, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ModalService} from '../../../../paper/src/lib/modal/modal.service';
import {ExampleModalComponent} from './example-modal/example-modal.component';
import {PaperReference} from '../../../../paper/src/lib/core/paper-reference';

@Component({
  selector: 'app-modal-section',
  templateUrl: './modal-section.component.html',
  styleUrls: ['./modal-section.component.scss']
})
export class ModalSectionComponent implements OnDestroy {
  private modalReference: PaperReference;

  constructor(
    private modalService: ModalService,
    private viewContainerReference: ViewContainerRef
  ) {}

  openModalWithService(): void {
    if (this.modalReference != null) {
      this.modalReference.destroy();
    }
    this.modalReference = this.modalService.open(ExampleModalComponent);
    const modal: ExampleModalComponent = this.modalReference.instance;
    modal.head = `Component Modal`;
    modal.body = `This component modal was opened with a service`;
  }

  openModalTemplateWithService(template: TemplateRef<any>): void {
    if (this.modalReference != null) {
      this.modalReference.destroy();
    }
    this.modalReference = this.modalService.open(template, null, this.viewContainerReference);
  }

  ngOnDestroy(): void {
    if (this.modalReference != null) {
      this.modalReference.destroy();
    }
  }
}
