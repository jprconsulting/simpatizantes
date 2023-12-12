import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AreasadscripcionService } from "src/app/pages/core/services/areasadscripcion.service";
import { MensajeService } from "src/app/pages/core/services/mensaje.service";
import { Areasadscripcion } from "src/app/pages/models/areasadscripcion";
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-card-areas",
  templateUrl: "./card-areas.component.html",
  styleUrls: ['./card-areas.component.css']
})

export class CardAreasComponent implements OnInit {
  isUpdating: boolean = false;
  AreaForm: FormGroup;
  formData: any;
  toggleValue = true;
  buscar: string = '';
  constructor(
    private areasadscripcionService: AreasadscripcionService,
    private formBuilder: FormBuilder,
    private mensajeService: MensajeService,
    ) {
      this.AreaForm = this.formBuilder.group({
        id: [null],
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
        descripcion: ['',Validators.required],
        estatus: [false, [Validators.required]]
      });

    }

  showModal = false;
  areasadscripcion: Areasadscripcion[] = [];

  openModal(): void {
    this.showModal = true;
    if (!this.isUpdating) {
      // Restablecer el formulario si no está en modo de actualización
      this.ResetForm();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.isUpdating = false;
  }

  ngOnInit(): void {
    this.obtenerAreas();
  }

  obtenerAreas(): void {
    this.areasadscripcionService.getAreasadscripcion().subscribe(
      (areasadscripcion) => {
        this.areasadscripcion = areasadscripcion;
      },
      (error) => {
        console.error('Error al obtener areas:', error);
      }
    );
  }
  toggleEstatus() {
    const estatusControl = this.AreaForm.get('Estatus');

    if (estatusControl) {
      estatusControl.setValue(estatusControl.value === 1 ? 0 : 1);
    }
  }
  ResetForm() {
    this.AreaForm.reset();
  }
  submit() {
    if (this.isUpdating) {
      this.editarArea();
    } else {
      this.agregar();
    }
  }
  idToUpdate2!: number;

  actualizarTabla() {
    this.areasadscripcionService.getAreasadscripcion().subscribe(
      (usuarios: Areasadscripcion[]) => {
        console.log('Datos actualizados:', usuarios);
        this.areasadscripcion = usuarios;
      }
    );
  }
  editarArea() {
    const areaFormValue = { ...this.AreaForm.value };
    this.areasadscripcionService.putArea(this.idToUpdate2,areaFormValue).subscribe({

      next: () => {
        this.mensajeService.mensajeExito("Área actualizada con éxito");
        this.ResetForm();
        this.actualizarTabla();
        console.log(areaFormValue);
        this.closeModal();
      },
      error: (error) => {
        this.mensajeService.mensajeError("Error al actualizar Area");
        console.error(error);
        console.log(areaFormValue);
      }
    });
  }

  eliminarArea(id: number) {
    this.mensajeService.mensajeAdvertencia(
      `¿Estás seguro de eliminar esta área`,
      () => {
        this.areasadscripcionService.deleteArea(id).subscribe({
          next: () => {
            this.mensajeService.mensajeExito('Área borrada correctamente');
            this.actualizarTabla();
          },
          error: (error) => this.mensajeService.mensajeError(error)
        });
      }
    );
  }

  agregar() {
    // Copia los valores del formulario
    const usuarioFormValue = { ...this.AreaForm.value };
    console.log('formulario',usuarioFormValue);

    this.areasadscripcionService.postArea(usuarioFormValue).subscribe({
      next: () => {
        this.ResetForm();
        this.mensajeService.mensajeExito("Área agregado Exitosamente");
        this.actualizarTabla();
        this.closeModal();
      },
      error: () => {
        this.mensajeService.mensajeError("Error al agregar área");
      }
    });
  }

  setDataModalUpdate(areasadscripcion: Areasadscripcion) {
    this.isUpdating = true;

    this.idToUpdate2 = areasadscripcion.id;
    this.AreaForm.patchValue({
      id: areasadscripcion.id,
      nombre: areasadscripcion.nombre,
      descripcion: areasadscripcion.descripcion,
      estatus: areasadscripcion.estatus,
    });
    this.formData = this.AreaForm.value;
    console.log(this.AreaForm.value);
  }

  filtrarResultados() {
    const filtroLowerCase = this.buscar.toLowerCase().trim();
    return this.areasadscripcion.filter(areas =>
      areas.nombre.toLowerCase().includes(filtroLowerCase) ||
      areas.descripcion.toLowerCase().includes(filtroLowerCase)
    );
  }
}
