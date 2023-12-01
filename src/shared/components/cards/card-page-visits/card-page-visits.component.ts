import { Component, OnInit } from "@angular/core";
import {Modal,Ripple,initTE,} from "tw-elements";
import { Input,} from "tw-elements";
import "tw-elements";

@Component({
  selector: "app-card-page-visits",
  templateUrl: "./card-page-visits.component.html",
})
export class CardPageVisitsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    initTE({ Modal, Ripple });
    initTE({ Input });
  }
}
