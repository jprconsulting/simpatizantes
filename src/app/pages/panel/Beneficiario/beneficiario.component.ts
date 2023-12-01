import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeneficiarioService } from '../../core/services/Beneficiario.service';

declare const google: any;


@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.css']
})
export class BeneficiarioComponent implements OnInit {
  BeneficiarioForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private beneficiarioService: BeneficiarioService
  ) {
    this.creaFormulario();
  }


  ngOnInit(): void {
    const mapElement = document.getElementById("map-canvas") || null;
    const lat = mapElement?.getAttribute("data-lat") || null;
    const lng = mapElement?.getAttribute("data-lng") || null;

    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 15,
      scrollwheel: false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },

      ],
    };

    let map = new google.maps.Map(mapElement, mapOptions);

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
      position: new google.maps.LatLng(19.31352580940692, -98.24402750446013),
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Hello World!",
    });
    const marker2 = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Hello World!",
    });
    const marker3 = new google.maps.Marker({
      position: new google.maps.LatLng(19.321043899052057, -98.25567955435218),
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Hello World!",
    });
    const marker4 = new google.maps.Marker({
      position: new google.maps.LatLng(19.32382243414208, -98.23023723438071),
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Hello World!",
    });
    const marker5 = new google.maps.Marker({
      position: new google.maps.LatLng(19.31191561325221, -98.21873717737),
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
    google.maps.event.addListener(marker2, "click", function () {
      infowindow.open(infoWindowOpenOptions, marker2);
    });
    google.maps.event.addListener(marker3, "click", function () {
      infowindow.open(infoWindowOpenOptions, marker3);
    });
    google.maps.event.addListener(marker4, "click", function () {
      infowindow.open(infoWindowOpenOptions, marker4);
    });
    google.maps.event.addListener(marker5, "click", function () {
      infowindow.open(infoWindowOpenOptions, marker5);
    });
  }


  creaFormulario() {
    this.BeneficiarioForm = this.formBuilder.group({
      Nombres: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(3)]],
      ApellidoPaterno: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(4)]],
      ApellidoMaterno: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(4)]],
      FechaNacimiento: ['', [Validators.required]],
      Domicilio: ['', [Validators.required, Validators.minLength(7)]],
      Sexo: ['', [Validators.required]],
      CURP: ['', [Validators.required, Validators.minLength(18), Validators.pattern(/^[A-Z]{4}[0-9]{6}[H,M][A-Z]{5}[0-9]{2}$/), Validators.maxLength(18)]],
      Estatus: ['', [Validators.required]],
      MunicipioId: ['', [Validators.required]],
    })
  }
  agregaraVotante() {
    const Beneficiario = { ...this.BeneficiarioForm.value };
    console.log('Beneficiario', Beneficiario);
    this.ResetForm();
    this.beneficiarioService.postVotante(Beneficiario).subscribe({
      next: () => {

        this.ResetForm();
      },
      error: (error) => {

        console.error(error);
      }
    });
  }
  ResetForm() {
    this.BeneficiarioForm.reset();
  }
  showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
