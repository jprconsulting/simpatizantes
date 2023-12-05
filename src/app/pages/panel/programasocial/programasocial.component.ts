import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BeneficiarioService } from '../../core/services/Beneficiario.service';

@Component({
  selector: 'app-programasocial',
  templateUrl: './programasocial.component.html',
  styleUrls: ['./programasocial.component.css']
})
export class ProgramasocialComponent  implements OnInit {
  BeneficiarioForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private beneficiarioService: BeneficiarioService
  ) {
    this.creaFormulario();
  }


  ngOnInit(): void {}


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
