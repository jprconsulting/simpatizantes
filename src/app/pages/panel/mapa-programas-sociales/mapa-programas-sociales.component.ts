import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
import { BeneficiarioMunicipio } from '../../models/beneficiariomunicipios';
import { MunicipiosService } from '../../core/services/municipios.service';
import { MapData } from './map-data';
import { DataMapa } from '../../models/municipios';
MapModule(Highcharts);

@Component({
  selector: 'app-mapa-programas-sociales',
  templateUrl: './mapa-programas-sociales.component.html',
  styleUrls: ['./mapa-programas-sociales.component.css']
})

export class MapaProgramasSocialesComponent implements OnInit {
  dataMapaTlaxcala = MapData;
  chartMap: Highcharts.Options = {};

  Highcharts: typeof Highcharts = Highcharts;
  beneficiarioMunicipio: BeneficiarioMunicipio[] = [];
  chartMapImage: any;
  mapData: any[] = [];
  buscar = '';
  municipioFiltrado: any[] = [];
  result: any;
  municipiosList: BeneficiarioMunicipio[] = [];


  constructor(
    private municipiosService: MunicipiosService,
  ) {

  }

  ngOnInit() {
    this.obtenerMunicipios();
    this.setSettingsMapa();
  }

  actualizarFiltro(event: any): void {
    this.buscar = event.target.value;
    this.municipioFiltrado = this.filtrarMunicipio();
    console.log('Municipios filtrados:', this.municipioFiltrado);
  }

  filtrarMunicipio(): any[] {
    return this.beneficiarioMunicipio.filter(muni =>
      muni.nombre.toLowerCase().includes(this.buscar.toLowerCase(),)
    );
  }
  obtenerMunicipios() {
    this.municipiosService.getBeneficiariosMunicipio().subscribe({
      next: (beneficiarioMunicipioAPI: BeneficiarioMunicipio[]) => {
        this.municipiosService.updateDataMapa(beneficiarioMunicipioAPI.map((i) => ({ id: i.id.toString(), color: i.color })));
        this.beneficiarioMunicipio = beneficiarioMunicipioAPI;
        this.beneficiarioMunicipio = beneficiarioMunicipioAPI.map(beneficiarioMunicipio => ({
          id: beneficiarioMunicipio.id,
          nombre: beneficiarioMunicipio.nombre.toString(),
          label: beneficiarioMunicipio.nombre,
          totalBeneficiarios: beneficiarioMunicipio.totalBeneficiarios,
          color: beneficiarioMunicipio.color,
          descripcionIndicador: beneficiarioMunicipio.descripcionIndicador,
        }));
      }, error: (error: any) => {
        console.error('Error al obtener municipios:', error);

      }
    }
    );

  }

  setSettingsMapa() {
    this.municipiosService.dataMapa$.subscribe((newData) => {
      this.chartMap = {
        chart: {
          backgroundColor: '#F8F9F9'
        },
        mapNavigation: {
          enabled: true,
          enableButtons: true,
          enableMouseWheelZoom: true,
          buttonOptions: {
            align: 'right',
            verticalAlign: 'top'
          }

        },
        navigator: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        colorAxis: {
          min: 0
        },
        plotOptions: {
          series: {
            inactiveOtherPoints: true,
            states: {
              hover: {
                borderColor: 'black'
              },
              inactive: {
                enabled: true,
                opacity: 0.5
              }
            },
            point: {
              events: {
                mouseOver: function (event: any) {
                  console.log('object');
                }
              }
            }
          }
        },
        tooltip: {
          useHTML: true,
          padding: 0,
          borderRadius: 0,
          borderWidth: 0,
          shadow: false,
          backgroundColor: 'none',
          borderColor: 'none',
          headerFormat: '',
          followPointer: false,
          stickOnContact: true,
          shared: false,
          pointFormat:
            `<div style="width: 360px; height: 120px; background: #ffffff; box-shadow: 0px 0px 12px 2px rgba(0,0,0,0.40); border-radius: 10px; opacity: 1;">
            <div style="width: 20px; height: 100%; box-sizing: border-box; float: left; background-color: {point.color}; border-radius: 10px 0px 0px 10px;"></div>
            <div class="d-flex align-items-center" style="padding: 5px; box-sizing: border-box; height: 60px; width: 340px; float: left;background: #fff;border-radius: 0px 10px 0px 0px;">
            <img src="assets/img/logos-partidos/{point.candidatura}.png" onerror="this.src='assets/img/logos-partidos/SG.png'" height="30">
            </div>
            <div style="padding: 5px; float: left;box-sizing: border-box; width: 340px; height: 60px; background: #f7f7f7; border-radius: 0px 0px 10px 0px;">
              <div class="d-flex flex-row justify-content-between w-100">
                <span class="px14 text-bold">Municipio</span>
                <a class="txRosaIne" href="{point.ruta}"  ><span class="txRosaIne px12 text-bold" style="width: 40%; text-decoration: underline;">Ver detalle</span></a>
              </div>
              <span class="px15 text-bold align-self-center" style="width: 60%;">{point.name}</span>
            </div>
          </div>`
        },
        series: [
          {
            type: "map",
            joinBy: "id",
            mapData: this.dataMapaTlaxcala,
            data: newData,
          }
        ]
      };


    });
  }


}
