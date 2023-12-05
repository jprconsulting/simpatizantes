import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-card-areas",
  templateUrl: "./card-areas.component.html",
})
export class CardAreasComponent implements OnInit {
  constructor() {}

  showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  ngOnInit(): void {}
}
