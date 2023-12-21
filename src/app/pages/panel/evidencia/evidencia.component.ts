import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BeneficiarioService } from 'src/app/pages/core/services/Beneficiario.service';
import { AreasadscripcionService } from 'src/app/pages/core/services/areasadscripcion.service';
import { EvidenciasService } from 'src/app/pages/core/services/evidencias.service';
import { MensajeService } from 'src/app/pages/core/services/mensaje.service';
import { ProgramaService } from 'src/app/pages/core/services/programasocial.service';
import { Areasadscripcion } from 'src/app/pages/models/areasadscripcion';
import { Beneficiario } from 'src/app/pages/models/beneficiario';
import { Evidencias } from 'src/app/pages/models/evidencias';
import { Prograsmasocial } from 'src/app/pages/models/programasocial';

@Component({
  selector: 'app-evidencia',
  templateUrl: './evidencia.component.html',
  styleUrls: ['./evidencia.component.css']
})
export class EvidenciaComponent {
  showModal = false;
  mostrarModal = false;
  isUpdating: boolean = false;
  programaSeleccionado: string = '';
  EvidenciaForm!: FormGroup;
  filteredArea: any[] = [];
  prograsmasocial: Prograsmasocial [] = [];
  areasadscripcion: Areasadscripcion[] = [];
  programaSocialSeleccionado!: number;
  areasadscripcionSeleccionado!: number;
  beneficiarios: any[] = [];
  programasPorArea: Prograsmasocial[] = [];
  beneficiario: Beneficiario [] = [];
  evidencias: Evidencias [] = [];
  programasFiltrados: Evidencias[] = [];
  beneficiariosPorprogramas: Beneficiario [] = [];
  filteredBeneficiarios: Beneficiario[] = [];
  searchTerm: FormControl = new FormControl();
  imagenAmpliada: string | null = null;
  idToUpdate2!: number;
  formData: any;

  ngOnInit() {
    this.obtenerBeneficiarios();
    this.obtenerProgramas();
    this.obtenerAreas();
    this.obtenerEvidencias();
  }

  getNombreBeneficiario(beneficiarioId: number): string {
    const beneficiario = this.beneficiarios.find(b => b.id === beneficiarioId);
    return beneficiario ? beneficiario.nombreCompleto : 'Nombre no encontrado';
  }

  openModal(): void {
    this.showModal = true;
    if (!this.isUpdating) {
      // Restablecer el formulario si no está en modo de actualización
      this.ResetForm();
    }

    this.beneficiarioService.getBeneficiario().subscribe((beneficiarios) => {
      this.beneficiarios = beneficiarios;
    });

  }

  closeModal(): void {
    this.showModal = false;
    this.isUpdating = false;
    const fotoControl = this.EvidenciaForm.get('Foto');
  if (fotoControl) {
    fotoControl.setValue(null);
  }
  this.ResetForm();

  }
  ResetForm() {
    this.EvidenciaForm.reset();
  }
  submit() {
    if (this.isUpdating) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private beneficiarioService: BeneficiarioService,
    private programaService: ProgramaService,
    private areasadscripcionService: AreasadscripcionService,
    private mensajeService: MensajeService,
    private evidenciasService: EvidenciasService,

  ) {
    this.formularioEvidencia();
  }
formularioEvidencia(){
  this.EvidenciaForm = this.formBuilder.group({
    id: [null],
    beneficiarioId: ['', [Validators.required]],
    imagenBase64: ['',Validators.required],
    Descripcion: ['', [Validators.required,Validators.minLength(10)]],
  });
}
obtenerBeneficiarios() {
  this.beneficiarioService.getBeneficiario().subscribe(
    (beneficiarios: Beneficiario[]) => {
      console.log('Datos de beneficiarios recibidos:', beneficiarios);
      this.beneficiarios = beneficiarios;
      this.filteredBeneficiarios = beneficiarios; // Inicializar con la lista completa
    },
    (error: any) => {
      console.error('Error al obtener beneficiarios:', error);
    }
  );
}
obtenerEvidencias() {
  this.evidenciasService.getEvidencias().subscribe(
    (evidencias: Evidencias[]) => {
      console.log('Datos dscdscdscds:', evidencias);
      this.evidencias = evidencias;
    },
    (error: any) => {
      console.error('Error al obtener beneficiarios:', error);
    }
  );
}

get concatenatedLabel() {
  const beneficiario = this.EvidenciaForm.get('Beneficiario')?.value;
  return beneficiario ? `${beneficiario.nombres} ${beneficiario.apellidoPaterno}` : '';
}

obtenerProgramas() {
  this.programaService.getPrograma().subscribe(
    (prograsmasocial: Prograsmasocial[]) => {
      console.log('Datos:', prograsmasocial);
      this.prograsmasocial = prograsmasocial;
    }
  );
}

obtenerAreas(): void {
  this.areasadscripcionService.getAreasadscripcion().subscribe(
    (areasadscripcion) => {
      console.log('Datos2:', areasadscripcion);
      this.areasadscripcion = areasadscripcion;
    },
    (error) => {
      console.error('Error al obtener areas:', error);
    }
  );
}

aplicarFiltro() {
  // Realizar el filtrado de beneficiarios según los criterios seleccionados
  this.filteredBeneficiarios = this.beneficiarios.filter(beneficiario => {
    return (
      (!this.programaSeleccionado || beneficiario.programa === this.programaSeleccionado) &&
      (!this.areasadscripcionSeleccionado || beneficiario.area === this.areasadscripcionSeleccionado)
    );
  });
}


  filtrarProgramaSocial(event: any, tipo: string) {
    this.programaSocialSeleccionado = Number(event.target.value);
    // Filtra los beneficiarios basándose en el programa social seleccionado
    this.beneficiariosPorprogramas = this.beneficiarios.filter(beneficiario => beneficiario.programaSocialId === this.programaSocialSeleccionado);
  }

filtrarArea(event: any, tipo: string) {
  this.areasadscripcionSeleccionado = Number(event.target.value);
  this.programasPorArea = this.prograsmasocial.filter(programa => programa.areaAdscripcionId == this.areasadscripcionSeleccionado);
}

filterBeneficiarios(searchTerm: string): Beneficiario[] {
  return this.beneficiarios.filter(beneficiario =>
    beneficiario.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beneficiario.apellidoPaterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beneficiario.apellidoMaterno.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

onBeneficiarioChange(event: any): void {
  // Obtén el beneficiario seleccionado del evento
  const beneficiarioSeleccionado = event;

  // Puedes realizar acciones adicionales aquí, como mostrar información sobre el beneficiario seleccionado
  console.log('Beneficiario seleccionado:', beneficiarioSeleccionado);
}

actualizarTabla() {
  this.evidenciasService.getEvidencias().subscribe(
    (evidencia: Evidencias[]) => {
      console.log('Datos actualizados:', evidencia);
      this.evidencias = evidencia;
    }
  );
}

onFileChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement.files && inputElement.files.length > 0) {
    const file = inputElement.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      const base64WithoutPrefix = base64String.split(';base64,').pop() || '';

      this.EvidenciaForm.patchValue({
        imagenBase64: base64WithoutPrefix
      });
    };

    reader.readAsDataURL(file);
  }
}

agregar() {
  const imagenBase64 = this.EvidenciaForm.get('imagenBase64')?.value;

  if (imagenBase64) {
    const FormValue = { ...this.EvidenciaForm.value, imagenBase64 };

    this.evidenciasService.postEvidencias(FormValue).subscribe({
      next: () => {
        this.ResetForm();
        this.mensajeService.mensajeExito("Evidencia agregada");
        this.actualizarTabla();
        this.closeModal();
      },
      error: () => {
        this.mensajeService.mensajeError("Error al agregar evidencia");
      }
    });
  } else {
    console.error('Error: No se encontró una representación válida en base64 de la imagen.');
  }
}

readFileAsDataURL(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Error al leer el archivo como URL de datos.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo.'));
    };

    // Leer el archivo como URL de datos
    reader.readAsDataURL(new Blob([filePath]));
  });
}


eliminar(id: number) {
  this.mensajeService.mensajeAdvertencia(
    `¿Estás seguro de eliminar la evidencia?`,
    () => {
      this.evidenciasService.deletePrograma(id).subscribe({
        next: () => {
          this.mensajeService.mensajeExito('Evidencia borrado correctamente');
          this.actualizarTabla();
        },
        error: (error) => this.mensajeService.mensajeError(error)
      });
    }
  );
}
obtenerRutaImagen(nombreArchivo: string): string {
  const rutaBaseAPI = 'https://localhost:7224/';
  if (nombreArchivo) {
    return `${rutaBaseAPI}images/${nombreArchivo}`;
  }
  return ''; // O una URL predeterminada si no hay nombre de archivo
}

mostrarImagenAmpliada(rutaImagen: string) {
  this.imagenAmpliada = rutaImagen;
  this.mostrarModal = true;
}

cerrarModal() {
  this.mostrarModal = false;
  this.imagenAmpliada = null;
}

setDataModalUpdate(evidencia: Evidencias) {
  this.isUpdating = true;
  this.idToUpdate2 = evidencia.id;
  this.EvidenciaForm.patchValue({
    id: evidencia.id,
    beneficiarioId: evidencia.beneficiarioId,
    imagenBase64: evidencia.imagenBase64,
    Descripcion: evidencia.descripcion,

  });

  this.formData = this.EvidenciaForm.value;
  console.log(this.EvidenciaForm.value);
  setTimeout(() => {
    this.openModal();
  }, 500);
  this.formData = this.EvidenciaForm.value;
  console.log(this.EvidenciaForm.value);
}

actualizar() {
  const socialFormValue = { ...this.EvidenciaForm.value };
  console.log('ferwohfw',this.idToUpdate2);
  this.evidenciasService.putPrograma(this.idToUpdate2, socialFormValue).subscribe({

    next: () => {
      this.mensajeService.mensajeExito("Evidencia actualizada con éxito");
      this.ResetForm();
      this.actualizarTabla();
      console.log(socialFormValue);
      this.closeModal();
    },
    error: (error) => {
      this.mensajeService.mensajeError("Error al actualizar la evidencia");
      console.error(error);
      console.log(socialFormValue);
    }
  });
}

obtenerProgramaSocial(beneficiarioId: number): string {
  const beneficiario = this.beneficiarios.find(b => b.id === beneficiarioId);
  if (beneficiario) {
    const programa = this.prograsmasocial.find(p => p.id === beneficiario.programaSocialId);
    if (programa) {
      return programa.nombre;
    }
  }
  return 'Sin programa';
}


}
