import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  filteredBeneficiarios: any[] = [];
  prograsmasocial: Prograsmasocial [] = [];
  areasadscripcion: Areasadscripcion[] = [];
  ngOnInit() {
    this.obtenerBeneficiarios();
    this.obtenerProgramas();
    this.obtenerAreas();
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

beneficiarios: any[] = []; // Tu array original de beneficiarios
filtroBeneficiario = this.beneficiarios;
// Lógica para aplicar el filtro
aplicarFiltro(): void {
  const filtro = this.EvidenciaForm.get('Beneficiario')?.value.toLowerCase();

  this.filteredBeneficiarios = this.beneficiarios.filter(beneficiario =>
    beneficiario.nombres.toLowerCase().includes(filtro) ||
    beneficiario.apellidoPaterno.toLowerCase().includes(filtro) ||
    beneficiario.apellidoMaterno.toLowerCase().includes(filtro)
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
      this.areasadscripcion = areasadscripcion;
    },
    (error) => {
      console.error('Error al obtener areas:', error);
    }
  );
}
filtrarProgramaSocial(event: any) {
  // Obtén el valor seleccionado en el select
  this.programaSeleccionado = event.target.value;

  // Puedes realizar acciones adicionales aquí, como enviar el valor a un servidor o mostrar resultados en la página
  console.log('Programa social seleccionado:', this.programaSeleccionado);
}

}
