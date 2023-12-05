import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreasadscripcionService } from 'src/app/pages/core/services/areasadscripcion.service';
import { ProgramaService } from 'src/app/pages/core/services/programasocial';
import { Areasadscripcion } from 'src/app/pages/models/areasadscripcion';

@Component({
  selector: 'app-card-bar-prograsmasocial',
  templateUrl: './card-bar-prograsmasocial.component.html',
  styleUrls: ['./card-bar-prograsmasocial.component.css']
})
export class CardBarPrograsmasocialComponent implements OnInit {
  SocialForm: FormGroup;
  areasadscripcion: Areasadscripcion[] = [];
  areasadscripcionOptions: { nombre: string, label: string }[] = [];
  color: string = ''; // Inicializa color con un valor predeterminado

  constructor(
    private formBuilder: FormBuilder,
    private programaService: ProgramaService,
    private areasadscripcionService: AreasadscripcionService,
  ) {
    this.SocialForm = this.formBuilder.group({
      Nombre: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]+$')]],
      AreaAdscripcionId: [''],
      Descripcion: ['', [Validators.required, Validators.minLength(10)]],
      Color: [null],
      Estatus: [true, [Validators.required]],
      //Acronimo: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]+$')]],
    });
  }

  showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  ngOnInit() {
this.obtenerA();
  }

  ResetForm() {
    this.SocialForm.reset();
    this.SocialForm.patchValue({ Color: this.color }); // Actualiza el valor del campo Color con el color actual
  }

  agregar() {
    const socialFormValue = { ...this.SocialForm.value };
    console.log('Valor del campo Color:', socialFormValue);
    this.programaService.postPrograma(socialFormValue).subscribe({
      next: () => {
        this.ResetForm();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  updateColor(newColor: string) {
    // Asegúrate de que SocialForm no sea nulo
    if (this.SocialForm) {
      // Asegúrate de que el control Color no sea nulo
      const colorControl = this.SocialForm.get('Color');
      if (colorControl) {
        // Actualiza el valor del formulario cuando cambia el color
        colorControl.setValue(newColor);
      }
    }
  }
  toggleEstatus() {
    const estatusControl = this.SocialForm.get('Estatus');
  
    if (estatusControl) {
      estatusControl.setValue(estatusControl.value === 1 ? 0 : 1);
    }
  }
  obtenerA() {
    if (this.areasadscripcionService) {
      this.areasadscripcionService.getAreasadscripcion().subscribe(
        (areasadscripcion: Areasadscripcion[]) => {
          console.log('Datos:', areasadscripcion);
          this.areasadscripcion = areasadscripcion;

          this.areasadscripcionOptions = areasadscripcion.map(areasadscripcion => ({
            nombre: +areasadscripcion.Id ? areasadscripcion.Id.toString() : '',
            label: areasadscripcion.nombre
          }));
          
  
          console.log('Opciones del select:', this.areasadscripcionOptions);
        },
        (error: any) => {
          console.error('Error al obtener:', error);
        }
      );
    } else {
      console.error('El servicio de municipios no está definido.');
    }
  }
  
  
  }
  
