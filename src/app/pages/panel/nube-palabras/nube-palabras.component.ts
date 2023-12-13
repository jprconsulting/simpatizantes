import { Component, ElementRef, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as Highcharts from 'highcharts';

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

const Wordcloud = require('highcharts/modules/wordcloud');
Wordcloud(Highcharts);



@Component({
  selector: 'app-nube-palabras',
  templateUrl: './nube-palabras.component.html',
  styleUrls: ['./nube-palabras.component.css'],
  styles: ['canvas { width: 100%; height: 400px; }']
})

export class NubePalabrasComponent implements OnInit {
  public activity: any;
  public xData: any;
  public label: any;
  options: any;

  constructor() {
    let arr = [
      'app',
      'html',
      'component',
      'testing',
      'whatsapp',
      'users',
      'code',
      'feedback',
      'service',
      'angular',
      'option',
      'motivated',
    ];
    let val = [
      46, 34, 33, 28, 26, 24, 23, 17, 17, 16, 12, 12, 12, 12, 12, 12, 12,
      11, 11, 11, 11, 11, 11, 11, 9, 9, 9, 9, 8,
    ];

    let data = arr.map((value, index) => {
      return { name: value, weight: val[index] };
    });

    this.options = {
      accessibility: {
        screenReaderSection: {
          beforeChartFormat:
            '<h5>{chartTitle}</h5>' +
            '<div>{chartSubtitle}</div>' +
            '<div>{chartLongdesc}</div>' +
            '<div>{viewTableButton}</div>',
        },
      },
      series: [
        {
          colors: ['#FFAAAA', '#D46A6A', '#AA3939', '#801515', '#550000'],
          type: 'wordcloud',
          data: data,
          name: 'palabra',
          minFontSize: 15,
          rotation: {
            from: -60,
            to: 60,
            orientations: 5
          },
        },
      ],
      title: {
        text: '',
      },
    };
  }

  ngOnInit() {
    Highcharts.chart('container', this.options);
  }
}

