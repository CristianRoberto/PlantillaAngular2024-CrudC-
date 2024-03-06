import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "modal-component",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export default class ModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  @Input() message: string = "¿Estás seguro de realizar la acción?";
  @Input() rejectButton: string = "No";
  @Input() acceptButton: string = "Si";
  @Input() iconclass: string = "fas fa-exclamation-triangle text-warning fa-2x";

}
