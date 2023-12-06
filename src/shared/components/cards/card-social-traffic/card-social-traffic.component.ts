import { Component, OnInit } from "@angular/core";
import { BeneficiarioService } from "src/app/pages/core/services/Beneficiario.service";
import { MunicipiosService } from "src/app/pages/core/services/municipios.service";
import { Beneficiario } from "src/app/pages/models/beneficiario";
import { Municipios } from "src/app/pages/models/municipios";
declare const google: any;
@Component({
  selector: "app-card-social-traffic",
  templateUrl: "./card-social-traffic.component.html",
})
export class CardSocialTrafficComponent{
  municipios: Municipios[] = [];
  beneficiarios: Beneficiario[] = [];

  municipiosOptions: { nombre: string, label: string }[] = [];
  constructor(
    private municipiosService: MunicipiosService,
    private beneficiarioService: BeneficiarioService,
    ) {}
  showModal = false;


  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
  ngOnInit() {
    this.obtenerMunicipios();
    this.obtenerBeneficiarios();
  }

  obtenerBeneficiarios() {
    this.beneficiarioService.getBeneficiario().subscribe(
      (beneficiarios: Beneficiario[]) => {
        console.log('Datos de beneficiarios recibidos:', beneficiarios);
        this.beneficiarios = beneficiarios;
      },
      (error: any) => {
        console.error('Error al obtener beneficiarios:', error);
      }
    );
  }

  obtenerMunicipios() {
    if (this.municipiosService) {
      this.municipiosService.getMunicipios().subscribe(
        (municipios: Municipios[]) => {
          console.log('Datos de municipios recibidos:', municipios);
          this.municipios = municipios;

          // Actualizar las opciones del select
          this.municipiosOptions = municipios.map(municipio => ({
            nombre: municipio.id.toString(),  // Ajusta el valor según la estructura de tus municipios
            label: municipio.nombre
          }));
        },
        (error: any) => {
          console.error('Error al obtener municipios:', error);
        }
      );
    } else {
      console.error('El servicio de municipios no está definido.');
    }
  }


}
