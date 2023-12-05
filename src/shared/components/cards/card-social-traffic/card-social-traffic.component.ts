import { Component, OnInit } from "@angular/core";
import { MunicipiosService } from "src/app/pages/core/services/municipios.service";
import { Municipios } from "src/app/pages/models/municipios";
declare const google: any;
@Component({
  selector: "app-card-social-traffic",
  templateUrl: "./card-social-traffic.component.html",
})
export class CardSocialTrafficComponent{
  municipios: Municipios[] = [];
  municipiosOptions: { nombre: string, label: string }[] = [];
  constructor(private municipiosService: MunicipiosService,) {}
  showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
  ngOnInit() {
    this.obtenerMunicipios();
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
