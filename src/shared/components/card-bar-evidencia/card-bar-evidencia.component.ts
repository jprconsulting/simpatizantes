import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BeneficiarioService } from 'src/app/pages/core/services/Beneficiario.service';
import { AreasadscripcionService } from 'src/app/pages/core/services/areasadscripcion.service';
import { ProgramaService } from 'src/app/pages/core/services/programasocial.service';
import { Areasadscripcion } from 'src/app/pages/models/areasadscripcion';
import { Beneficiario } from 'src/app/pages/models/beneficiario';
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
  beneficiariosPorprogramas: Beneficiario [] = [];
  filteredBeneficiarios: Beneficiario[] = [];
  searchTerm: FormControl = new FormControl();

  ngOnInit() {
    this.obtenerBeneficiarios();
    this.obtenerProgramas();
    this.obtenerAreas();
    this.customLabel(this.beneficiarios);
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
 
  }
  ResetForm() {
    //this.SocialForm.reset();
  }
  submit() {
    if (this.isUpdating) {
      //this.actualizar();
    } else {
      //this.agregar();
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private beneficiarioService: BeneficiarioService,
    private programaService: ProgramaService,
    private areasadscripcionService: AreasadscripcionService,
    
  ) {
    this.formularioEvidencia();
  }
formularioEvidencia(){
  this.EvidenciaForm = this.formBuilder.group({
    id: [null],
    Beneficiario: ['', [Validators.required]],
    Foto: ['',Validators.required],
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
onFileChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement.files && inputElement.files.length > 0) {
    const file = inputElement.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.EvidenciaForm.patchValue({
        Foto: reader.result
      });
    };
  }
}
// En tu componente


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

customLabel(beneficiarios: any): string {
  const label = `${beneficiarios.nombres} ${beneficiarios.apellidoPaterno} ${beneficiarios.apellidoMaterno}`;
  console.log('Etiqueta personalizada:', label);
  return label;
}
}





