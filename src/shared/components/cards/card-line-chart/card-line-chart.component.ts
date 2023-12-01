import { Component, OnInit } from "@angular/core";
import { ChartData, ChartTypeRegistry } from 'chart.js';

@Component({
  selector: "app-card-line-chart",
  templateUrl: "./card-line-chart.component.html",
  styleUrls: ['./card-line-chart.component.css']
})
export class CardLineChartComponent implements OnInit {
  
  public pieChartData: ChartData = {
    datasets: [
      {
        data: [150, 120, 105, 90, 70],
        backgroundColor: ['#E4BCD4', '#957DAD', '#C6E1F1', '#F4D9BC', '#ECDFD8'],
        label: 'Asistencia'
      }
    ],
    labels: ['Asistencia Social', 'Asistencia Jurídica', 'Asistencia Alimentaria', 'Salud y Bienestar', 'Desarrollo Familiar']
  };

  public pieChartType: keyof ChartTypeRegistry = 'pie';
  public pieChartOptions: any = {
    responsive: true
  };
  public pieChartLegend = true;




  public pieChartData2: ChartData = {
    datasets: [
      {
        data: [90, 10],
        backgroundColor: ['#957DAD', '#E4BCD4'],
        label: 'Asistencia'
      }
    ],
    labels: ['Beneficiarios satisfechos', 'Beneficiarios no satisfechos']
  };

  public pieChartType2: keyof ChartTypeRegistry = 'pie';
  public pieChartOptions2: any = {
    responsive: true
  };
  public pieChartLegend2 = true;



  public pieChartData3: ChartData = {
    datasets: [
      {
        data: [90, 10],
        backgroundColor: [ '#C6E1F1','#957DAD'],
        label: 'Asistencias'
      }
    ],
    labels: ['Ayuda Entregada', 'Beneficiarios en espera']
  };

  public pieChartType3: keyof ChartTypeRegistry = 'bar';

  public pieChartOptions3: any = {
    responsive: true
  };
  public pieChartLegend3 = true;
  

  constructor() { }

  ngOnInit() { }

 
}