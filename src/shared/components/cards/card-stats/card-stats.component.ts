import { Component, OnInit, Input } from "@angular/core";
import * as Highcharts from 'highcharts';
import * as HCWordCloud from 'highcharts/modules/wordcloud';



@Component({
  selector: "app-card-stats",
  templateUrl: "./card-stats.component.html",
  styleUrls: ['./card-stats.component.css']
})
export class CardStatsComponent implements OnInit {
  obj: any
  constructor() {}

  ngOnInit() {

  }

}



