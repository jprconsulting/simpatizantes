import { Component, OnInit, Input } from "@angular/core";
import * as Highcharts from 'highcharts';
import * as HCWordCloud from 'highcharts/modules/wordcloud';



@Component({
  selector: "app-card-stats",
  templateUrl: "./card-stats.component.html",
  styleUrls: ['./card-stats.component.css']
})
export class CardStatsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const data = [{
      name: 'creativity',
      weight: 31
  }, {
      name: 'creative',
      weight: 22
  }, {
      name: 'intelligence',
      weight: 15
  }, {
      name: 'more',
      weight: 12
  }, {
      name: 'people',
      weight: 12
  }, {
      name: 'theory',
      weight: 11
  }, {
      name: 'problem',
      weight: 11
  }, {
      name: 'thinking',
      weight: 11
  }, {
      name: 'been',
      weight: 11
  }, {
      name: 'can',
      weight: 11
  }, {
      name: 'process',
      weight: 11
  }, {
      name: 'new',
      weight: 10
  },];

      Highcharts.chart('container', {

        series: [{
            colors: ['#FFAAAA', '#D46A6A', '#AA3939', '#801515', '#550000'],
            rotation: {
                from: -60,
                to: 60,
                orientations: 5
            },
            type: 'wordcloud',
            data: data
        }],
        title: {
            text: 'Most popular words used to describe creativity'
        },
        tooltip: {
            enabled: false
        },
        subtitle: {
            text: '<a href="https://en.wikipedia.org/wiki/Creativity">Source: Wikipedia</a>'
        }
      });
  }
}



