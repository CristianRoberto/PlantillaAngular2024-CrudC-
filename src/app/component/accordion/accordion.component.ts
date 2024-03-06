import { Component, ViewEncapsulation } from "@angular/core";
import { NgbAccordionModule, NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { NgFor, NgIf, CommonModule } from "@angular/common";

@Component({
  selector: "app-ngbd-accordion-basic",
  standalone: true,
  imports: [NgbAccordionModule, NgFor, NgIf, CommonModule, NgbAlertModule],
  templateUrl: "accordion.component.html",
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .custom-header::after {
        content: none;
      }
    `,
  ],
})
export class NgbdAccordionBasicComponent {
  //   open at a time
  panels = ["First", "Second", "Third"];

  // keep content
  remove = true;

  text: string =
    "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.";
}
