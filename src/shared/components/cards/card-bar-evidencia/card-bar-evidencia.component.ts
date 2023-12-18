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
  selector: 'app-card-bar-evidencia',
  templateUrl: './card-bar-evidencia.component.html',
  styleUrls: ['./card-bar-evidencia.component.css']
})
export class CardBarEvidenciaComponent {
  showModal = false;
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
  beneficiariosPorprogramas: Beneficiario [] = [];
  filteredBeneficiarios: Beneficiario[] = [];
  searchTerm: FormControl = new FormControl();

  ngOnInit() {
    this.obtenerBeneficiarios();
    this.obtenerProgramas();
    this.obtenerAreas();
    this.obtenerEvidencias();
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
      //this.actualizar();
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
onFileChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement.files && inputElement.files.length > 0) {
    const file = inputElement.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.EvidenciaForm.patchValue({
        imagenBase64: reader.result
      });
    };
  }

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



agregar() {
  const FormValue = { ...this.EvidenciaForm.value };


  //aqui inicia 
  const filePath = FormValue.imagenBase64; // Asumiendo que la propiedad es Foto
  this.readFileAsDataURL(filePath)
    .then(base64String => {
      const base64SinEncabezado = base64String.split(',')[1];
      console.log('Imagen en formato base64:', base64SinEncabezado);
    FormValue.imagenBase64 = base64SinEncabezado;



  delete FormValue.id;
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
})
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
  const rutaBaseApp = 'https://localhost:7154/';
  if (nombreArchivo) {
    return `${rutaBaseApp}images/${nombreArchivo}`;
  }
  return '/assets/images/';
}

}





