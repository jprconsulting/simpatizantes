import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeneficiarioService } from 'src/app/pages/core/services/Beneficiario.service';
import { Beneficiario } from 'src/app/pages/models/beneficiario';

@Component({
  selector: 'app-card-bar-evidencia',
  templateUrl: './card-bar-evidencia.component.html',
  styleUrls: ['./card-bar-evidencia.component.css']
})
export class CardBarEvidenciaComponent {
  showModal = false;
  isUpdating: boolean = false;
  beneficiarios: Beneficiario[] = [];
  EvidenciaForm!: FormGroup;

  ngOnInit() {
    this.obtenerBeneficiarios();
  }
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
}
