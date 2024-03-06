import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { FeatherModule } from "angular-feather";

@Component({
  templateUrl: "card.component.html",
  standalone: true,
  imports: [FeatherModule, NgFor],
})
export class CardsComponent {
  cardImages: string[] = [
    "assets/images/big/img1.jpg",
    "assets/images/big/img2.jpg",
    "assets/images/big/img3.jpg",
    "assets/images/big/img4.jpg",
    "assets/images/big/img5.jpg",
    "assets/images/big/img6.jpg",
  ];
  exampleTextCard =
    "Some quick example text to build on the card title and make up the bulk of the card's content.";
  cardType2: { name: string; image: string }[] = [
    {
      name: "Nancy Henry",
      image: "assets/images/big/img5.jpg",
    },
    {
      name: "George Jane",
      image: "assets/images/big/img6.jpg",
    },
    {
      name: "Samuel Eliza",
      image: "assets/images/big/img7.jpg",
    },
  ];
}
