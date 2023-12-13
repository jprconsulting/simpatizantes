import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BeneficiarioService } from "src/app/pages/core/services/Beneficiario.service";
import { MensajeService } from "src/app/pages/core/services/mensaje.service";
import { MunicipiosService } from "src/app/pages/core/services/municipios.service";
import { ProgramaService } from "src/app/pages/core/services/programasocial.service";
import { Beneficiario } from "src/app/pages/models/beneficiario";
import { Municipios } from "src/app/pages/models/municipios";
import { Prograsmasocial } from "src/app/pages/models/programasocial";
import * as XLSX from 'xlsx';
declare const google: any;
@Component({
  selector: "app-card-social-traffic",
  templateUrl: "./card-social-traffic.component.html",
  styleUrls: ["./card-social-traffic.component.css" ],
})
export class CardSocialTrafficComponent{
  municipios: Municipios[] = [];
  prograsmasocial: Prograsmasocial [] = [];
  beneficiarios: Beneficiario[] = [];
  SocialForm: FormGroup;
  idToUpdate2!: number;
  isUpdating: boolean = false;
  sexos: { [key: number]: string } = {
    1: 'Masculino',
    2: 'Femenino'
  };

  municipiosOptions: {id: number, nombre: string, label: string }[] = [];
  programasOptions: {id: number, nombre: string, label: string }[] = [];
  formData: any;

  constructor(
    private programaService: ProgramaService,
    private municipiosService: MunicipiosService,
    private beneficiarioService: BeneficiarioService,
    private mensajeService: MensajeService,
    private formBuilder: FormBuilder,

    )
    {
      this.SocialForm = this.formBuilder.group({
        id: [null],
        nombres: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
        apellidoPaterno: ['',Validators.required],
        apellidoMaterno: ['',Validators.required],
        fechaNacimiento: ['', ],
        domicilio: ['',Validators.required],
        sexo: ['',Validators.required],
        curp: ['',Validators.required],
        latitud: ['',Validators.required],
        longitud: ['',Validators.required],
        estatus: [true, [Validators.required]],
        municipioId: ['',Validators.required],
        programaSocialId: ['',Validators.required],
      });
    }
  showModal = false;
  mostrarMapa = false;
  activarMapa() {
    this.mostrarMapa = true;
    // Puedes llamar a cualquier lógica adicional necesaria para activar el mapa aquí
    this.map();
  }
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
  ngOnInit() {
    this.obtenerMunicipios();
    this.obtenerBeneficiarios();
    this.ObtenerProgramas();
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
          this.municipiosOptions = municipios.map(municipio => ({
            id: municipio.id,
            nombre: municipio.id.toString(),
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

  ObtenerProgramas(){
    if (this.programaService) {
      this.programaService.getPrograma().subscribe(
        (prograsmasocial: Prograsmasocial[]) => {
          console.log('Datos de programas sociales recibidos:', prograsmasocial);
          this.prograsmasocial = prograsmasocial;
          this.programasOptions = prograsmasocial.map(prograsmasocial => ({
            id: prograsmasocial.id,
            nombre: prograsmasocial.id.toString(),
            label: prograsmasocial.nombre
          }));
        },
        (error: any) => {
          console.error('Error al obtener programas:', error);
        }
      );
    } else {
      console.error('El servicio de programas no está definido.');
    }
  }


  ResetForm() {
    this.SocialForm.reset();
  }

  actualizarTabla() {
    this.beneficiarioService.getBeneficiario().subscribe(
      (beneficiarios: Beneficiario[]) => {
        console.log('Datos actualizados:', beneficiarios);
        this.beneficiarios = beneficiarios;
      }
    );
  }

  submit() {
    if (this.isUpdating) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }

  agregar() {
    const socialFormValue = { ...this.SocialForm.value };
    delete socialFormValue.id;
    this.beneficiarioService.postVotante(socialFormValue).subscribe({
      next: () => {
        this.ResetForm();
        this.mensajeService.mensajeExito("Beneficiario agregado exitosamente");
        this.actualizarTabla();
        this.closeModal();
      },
      error: (error) => {
        this.mensajeService.mensajeError("Error al agregar el beneficiario");
      }
    });
  }

  actualizar() {
    const socialFormValue = { ...this.SocialForm.value };
    console.log('ferwohfw',this.idToUpdate2);
    this.beneficiarioService.putBeneficiario(this.idToUpdate2, socialFormValue).subscribe({

      next: () => {
        this.mensajeService.mensajeExito("Beneficiario actualizado con éxito");
        this.ResetForm();
        this.actualizarTabla();
        console.log(socialFormValue);
        this.closeModal();
      },
      error: (error) => {
        this.mensajeService.mensajeError("Error al actualizar el beneficiario");
        console.error(error);
        console.log(socialFormValue);
      }
    });
  }

  borrar(id: number, beneficiario: string) {
    this.mensajeService.mensajeAdvertencia(
      `¿Estás seguro de eliminar el beneficiario: ${beneficiario}?`,
      () => {
        this.beneficiarioService.deleteBeneficiario(id).subscribe({
          next: () => {
            this.mensajeService.mensajeExito('Beneficiario borrado correctamente');
            this.actualizarTabla();
          },
          error: (error) => this.mensajeService.mensajeError(error)
        });
      }
    );
  }

  setDataModalUpdate(beneficiario: Beneficiario) {
    this.isUpdating = true;
    this.idToUpdate2 = beneficiario.id;
    this.SocialForm.patchValue({
      id: beneficiario.id,
      nombres: beneficiario.nombres,
      apellidoPaterno: beneficiario.apellidoPaterno,
      apellidoMaterno: beneficiario.apellidoMaterno,
      fechaNacimiento: beneficiario.fechaNacimiento,
      domicilio: beneficiario.domicilio,
      sexo: beneficiario.sexo,
      curp: beneficiario.curp,
      latitud: beneficiario.latitud,
      longitud: beneficiario.longitud,
      estatus: beneficiario.estatus,
      municipioId: beneficiario.municipioId,
      programaSocialId: beneficiario.programaSocialId,
    });
    this.formData = this.SocialForm.value;
    console.log(this.SocialForm.value);
  }

  map() {
    const mapElement = document.getElementById("map-canvas");
    if (!mapElement) {
      console.error("El elemento del mapa no fue encontrado");
      return;
    }

    const lat = mapElement.getAttribute("data-lat");
    const lng = mapElement.getAttribute("data-lng");

    if (!lat || !lng) {
      console.error("Los atributos de latitud y/o longitud no están presentes");
      return;
    }

    const myLatlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));

    const mapOptions = {
      zoom: 15,
      scrollwheel: false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      // ... (otros ajustes de estilo)
    };

    const map = new google.maps.Map(mapElement, mapOptions);

    const input = document.getElementById('searchInput');
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }

      if (place.formatted_address) {
        // Actualizar el valor del campo 'domicilio' con la dirección obtenida del mapa
        this.SocialForm.patchValue({
          domicilio: place.formatted_address
        });
      }

      const selectedLat = place.geometry.location.lat();
      const selectedLng = place.geometry.location.lng();

      mapElement.setAttribute("data-lat", selectedLat.toString());
      mapElement.setAttribute("data-lng", selectedLng.toString());

      const newLatLng = new google.maps.LatLng(selectedLat, selectedLng);
      map.setCenter(newLatLng);
      map.setZoom(15);

      const marker = new google.maps.Marker({
        position: newLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: place.name,
      });

      const contentString = `
        <!-- Contenido de la ventana de información (infowindow) -->
        <!-- ... -->
      `;

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      google.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });

      this.SocialForm.patchValue({
        longitud: selectedLng,
        latitud: selectedLat
      });
    });
  }

mapa2(): void {
  const latitudControl = this.SocialForm.get('latitud');
  const longitudControl = this.SocialForm.get('longitud');

  if (latitudControl && longitudControl) {
    const latitud = latitudControl.value;
    const longitud = longitudControl.value;

    console.log('Latitud:', latitud);
    console.log('Longitud:', longitud);

    const mapElement = document.getElementById("map-canvas") || null;
    const myLatlng = new google.maps.LatLng(latitud, longitud);
    const mapOptions = {
      zoom: 15,
      scrollwheel: false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        // ... tus estilos ...
      ],
    };

    let map = new google.maps.Map(mapElement, mapOptions);
  map.setCenter(new google.maps.LatLng(latitud, longitud));
  map.setZoom(15);
  const input = document.getElementById('searchInput');
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
  autocomplete.addListener("place_changed", function () {
    infowindow.close();
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    console.log(place);
    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
  });
  const marker1 = new google.maps.Marker({
    position: new google.maps.LatLng(latitud, longitud),
    map: map,
    animation: google.maps.Animation.DROP,
    title: "Hello World!",
  });

  const contentString = `
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <img class="w-24 h-24 mb-3 rounded-full shadow-lg justify-center " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeJH_SWkfpDpy8Y0yPzJ0-7UBwkt9RTSFXUw&usqp=CAU" alt="Sunset in the mountains">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">Cristian Carreto Trejo</div>
      <p class="text-gray-900 text-base">
        Programa inscrito:
        <p class="text-gray-700 text-base">
        Asistencia Jurídica
        </p>
      </p>
      <p class="text-gray-900 text-base">
      Dirección:
        <p class="text-gray-700 text-base">
          Calle Cuauhtémoc, Tlaxcala
        </p>
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Teléfono: 246 218 4918</span>
    </div>
  </div>
  `;
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  const infoWindowOpenOptions = {
    map: map,
    anchor: marker1,
    shouldFocus: false
  };
  google.maps.event.addListener(marker1, "click", function () {
    infowindow.open(infoWindowOpenOptions, marker1);
  });
}
}
exportarDatosAExcel() {
  if (this.beneficiarios.length === 0) {
    console.warn('La lista de usuarios está vacía. No se puede exportar.');
    return;
  }

  const datosParaExportar = this.beneficiarios.map(beneficiarios => {
    return {
      'ID': beneficiarios.nombres,
      'ApellidoPaterno': beneficiarios.apellidoPaterno,
      'Apellido Materno': beneficiarios.apellidoMaterno,
      'FechaNacimiento': beneficiarios.fechaNacimiento,
      'Curp': beneficiarios.curp,
      'Sexo': beneficiarios.sexo,
      'Domicilio': beneficiarios.domicilio,
      'Estatus': beneficiarios.estatus,
    };
  });

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosParaExportar);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  this.guardarArchivoExcel(excelBuffer, 'beneficiarios.xlsx');
}

guardarArchivoExcel(buffer: any, nombreArchivo: string) {
  const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url: string = window.URL.createObjectURL(data);
  const a: HTMLAnchorElement = document.createElement('a');
  a.href = url;
  a.download = nombreArchivo;
  a.click();
  window.URL.revokeObjectURL(url);
}


}
