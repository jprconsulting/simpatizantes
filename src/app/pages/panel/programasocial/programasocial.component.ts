import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AreasadscripcionService } from 'src/app/pages/core/services/areasadscripcion.service';
import { MensajeService } from 'src/app/pages/core/services/mensaje.service';
import { ProgramaService } from 'src/app/pages/core/services/programasocial.service';
import { Areasadscripcion } from 'src/app/pages/models/areasadscripcion';
import { Prograsmasocial } from 'src/app/pages/models/programasocial';

@Component({
  selector: 'app-programasocial',
  templateUrl: './programasocial.component.html',
  styleUrls: ['./programasocial.component.css']
})
export class ProgramasocialComponent  implements OnInit {
  SocialForm: FormGroup;
  areasadscripcion: Areasadscripcion[] = [];
  prograsmasocial: Prograsmasocial [] = [];
  areasadscripcionOptions: { nombre: string, label: string }[] = [];
  color: string = ''; // Inicializa color con un valor predeterminado
  formData: any;
  title="Crear";
  isUpdating: boolean = false;
  id!: number;
  nombre!: string;
  programasFiltrados: Prograsmasocial[] = [];
  filtroTexto: string = '';
  toggleValue = true;

  constructor(
    private formBuilder: FormBuilder,
    private programaService: ProgramaService,
    private areasadscripcionService: AreasadscripcionService,
    private mensajeService: MensajeService,
  ) {
    this.SocialForm = this.formBuilder.group({
      id: [null],
      Nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
      AreaAdscripcionId: ['',Validators.required],
      areaAdscripcion: [''],
      Descripcion: [''],
      Color: [null],
      Estatus: [true, [Validators.required]],
      Acronimo: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]+$')]],

    });
  }

  showModal = false;

  openModal(): void {
    this.showModal = true;
    this.toggleValue = true;
    if (!this.isUpdating) {
      // Restablecer el formulario si no está en modo de actualización
      this.ResetForm();
    }
  }
  closeModal(): void {
    console.log('Cerrando el modal');
    this.showModal = false;
    this.isUpdating = false;
    this.selectedColor = '';
    this.ResetForm();
  }

  ngOnInit() {
    this.obtenerA();
    this.obtenerProgramas();
    this.aplicarFiltro();

  }

  ResetForm() {
    this.SocialForm.reset();
    this.color = '';
    this.toggleValue = true;
  }

  agregar() {
    // Copia los valores del formulario
    const socialFormValue = { ...this.SocialForm.value };

    // Elimina el campo 'id' del objeto
    delete socialFormValue.id;

    console.log('Valor del campo Color:', socialFormValue);

    // Convertir AreaAdscripcionId a número
    socialFormValue.AreaAdscripcionId = +socialFormValue.AreaAdscripcionId;

    const selectedArea = this.areasadscripcion.find(area => area.id === socialFormValue.AreaAdscripcionId);

    // Verificar que la área seleccionada existe
    if (selectedArea) {
      // Asignar el nombre de la área al objeto socialFormValue
      socialFormValue.areaAdscripcion = selectedArea.nombre;
    }

    this.programaService.postPrograma(socialFormValue).subscribe({
      next: () => {
        this.ResetForm();
        this.mensajeService.mensajeExito("Programa Social Agregado Exitosamente");
        this.actualizarTabla();
        this.closeModal();
      },
      error: (error) => {
        this.mensajeService.mensajeError("Error al agregar programa social");
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
        },

      );
    }
  }
  obtenerProgramas() {
    this.programaService.getPrograma().subscribe(
      (prograsmasocial: Prograsmasocial[]) => {
        console.log('Datos:', prograsmasocial);
        this.prograsmasocial = prograsmasocial;
      }
    );
  }
  actualizarTabla() {
    this.programaService.getPrograma().subscribe(
      (prograsmasocial: Prograsmasocial[]) => {
        console.log('Datos actualizados:', prograsmasocial);
        this.prograsmasocial = prograsmasocial;
      }
    );
  }

  borrar(id: number, programa: string) {
    this.mensajeService.mensajeAdvertencia(
      `¿Estás seguro de eliminar el programa social con nombre: ${programa}?`,
      () => {
        this.programaService.deletePrograma(id).subscribe({
          next: () => {
            this.mensajeService.mensajeExito('Programa social borrado correctamente');
            this.actualizarTabla();
          },
          error: (error) => this.mensajeService.mensajeError(error)
        });
      }
    );
  }
  idToUpdate2!: number;

  actualizar() {
    const socialFormValue = { ...this.SocialForm.value };
    console.log('Valor del campo Color:', socialFormValue);

    // Convertir AreaAdscripcionId a número
    socialFormValue.AreaAdscripcionId = +socialFormValue.AreaAdscripcionId;

    const selectedArea = this.areasadscripcion.find(area => area.id === socialFormValue.AreaAdscripcionId);

    // Verificar que la área seleccionada existe
    if (selectedArea) {
      // Asignar el nombre de la área al objeto socialFormValue
      socialFormValue.areaAdscripcion = selectedArea.nombre;
    }
    console.log('ferwohfw',this.idToUpdate2);
    this.programaService.putPrograma(this.idToUpdate2, socialFormValue).subscribe({

      next: () => {
        this.mensajeService.mensajeExito("Programa social actualizado con éxito");
        this.ResetForm();
        this.actualizarTabla();
        console.log(socialFormValue);
        this.closeModal();
      },
      error: (error) => {
        this.mensajeService.mensajeError("Error al actualizar programa social");
        console.error(error);
        console.log(socialFormValue);
      }
    });
  }

  get isFormDirty(): boolean {
    return Object.values(this.SocialForm.controls).some(control => control.value !== null && control.value !== undefined && control.value !== '');
  }
  get tieneColor(): boolean {
    return this.color !== undefined && this.color !== null && this.color.trim() !== '';
  }

  submit() {
    if (this.isUpdating) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }
  selectedColor='';

setDataModalUpdate(prograsmasocial: Prograsmasocial) {
  this.isUpdating = true;
  this.idToUpdate2 = prograsmasocial.id;
  this.selectedColor! = prograsmasocial.color;
  this.SocialForm.patchValue({
    id: prograsmasocial.id,
    Nombre: prograsmasocial.nombre,
    Color: prograsmasocial.color,
    Estatus: prograsmasocial.estatus,
    AreaAdscripcionId: prograsmasocial.areaAdscripcionId,
    Acronimo: prograsmasocial.acronimo,
    Descripcion: prograsmasocial.descripcion,
  });
  this.formData = this.SocialForm.value;
  console.log(this.SocialForm.value);
}

aplicarFiltro() {
  this.programasFiltrados = this.prograsmasocial.filter(programa =>
    programa.nombre.toLowerCase().includes(this.filtroTexto.toLowerCase())
  );
}
buscar: string = '';
programaFiltrado: any [] = [];

filtrarProgramas():  any {
  return this.prograsmasocial.filter(programasocial =>
    programasocial.nombre.toLowerCase().includes(this.buscar.toLowerCase(),) ||
    programasocial.acronimo.toLowerCase().includes(this.buscar.toLowerCase(),) ||
    programasocial.color.toLowerCase().includes(this.buscar.toLowerCase(),)
  );

}
actualizarFiltro(event: any): void {
  this.buscar = event.target.value;
  this.programaFiltrado = this.filtrarProgramas();
}

}
