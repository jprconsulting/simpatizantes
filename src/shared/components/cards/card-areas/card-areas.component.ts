import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AreasadscripcionService } from "src/app/pages/core/services/areasadscripcion.service";
import { MensajeService } from "src/app/pages/core/services/mensaje.service";
import { Areasadscripcion } from "src/app/pages/models/areasadscripcion";
import * as XLSX from 'xlsx';


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
  areasFiltradas: any [] = [];
  constructor(
    private areasadscripcionService: AreasadscripcionService,
    private formBuilder: FormBuilder,
    private mensajeService: MensajeService,
    ) {
      this.AreaForm = this.formBuilder.group({
        id: [null],
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
        descripcion: ['',[Validators.required, Validators.minLength(10), Validators.pattern('^[a-zA-Z ]+$')]],
        estatus: [false, [Validators.required]]
      });

    }

  showModal = false;
  areasadscripcion: Areasadscripcion[] = [];

  openModal(): void {
    this.showModal = true;
    this.toggleValue = true;
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
    this.areasFiltradas = this.areasadscripcion;
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
    if (this.AreaForm.valid) {
    const usuarioFormValue = { ...this.AreaForm.value };
    console.log('formulario',usuarioFormValue);
    delete usuarioFormValue.id;
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
  this.mensajeService.mensajeError("Error al agregar área");
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
    exportarDatosAExcel() {
      if (this.areasadscripcion.length === 0) {
        console.warn('La lista de usuarios está vacía. No se puede exportar.');
        return;
      }

      const datosParaExportar = this.areasadscripcion.map(areasadscripcion => {
        return {
          'ID': areasadscripcion.id,
          'Nombre': areasadscripcion.nombre,
          'Descripcion': areasadscripcion.descripcion,
          'Estatus': areasadscripcion.estatus,

        };
      });

      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosParaExportar);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      this.guardarArchivoExcel(excelBuffer, 'areas_adscripcion.xlsx');
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

    areas: any[] = [
      // Llama a un método de tu servicio para obtener los usuarios desde la base de datos
      this.areasadscripcionService.getAreasadscripcion().subscribe((data: any) => {
        this.areas = data;
        console.log(data)
      })
    ];

    filtrarAreas():  any {
      return this.areasadscripcion.filter(area =>
        area.nombre.toLowerCase().includes(this.buscar.toLowerCase(),)||
        area.descripcion.toLowerCase().includes(this.buscar.toLowerCase(),)
      );

    }

    actualizarFiltro(event: any): void {
      this.buscar = event.target.value;
      this.areasFiltradas = this.filtrarAreas();
    }
  }

