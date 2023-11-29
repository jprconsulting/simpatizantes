import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VotanteService } from '../../core/services/votantes.service';

@Component({
  selector: 'app-votante',
  templateUrl: './votante.component.html',
  styleUrls: ['./votante.component.css']
})
export class VotanteComponent {
  VotantesForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private votanteService: VotanteService,

    
    ){
    this.creaFormulario();
  }
  creaFormulario(){
    this.VotantesForm = this.formBuilder.group({
      Nombres: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(3)]],
      ApellidoPaterno: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(4)]],
      ApellidoMaterno: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(4)]],
      FechaNacimiento: ['', [Validators.required]],
      Domicilio: ['', [Validators.required, Validators.minLength(7)]],
      Sexo: ['', [Validators.required]],
      CURP: ['',[Validators.required,Validators.minLength(18),Validators.pattern(/^[A-Z]{4}[0-9]{6}[H,M][A-Z]{5}[0-9]{2}$/),Validators.maxLength(18)]],
      Estatus: ['', [Validators.required]],
      MunicipioId: ['', [Validators.required]],
    })
  }
  agregaraVotante() {
      const Votante = { ...this.VotantesForm.value };
      console.log('votante', Votante);
      this.ResetForm();
      this.votanteService.postVotante(Votante).subscribe({
        next: () => {
          
          this.ResetForm();
        },
        error: (error) => {
         
          console.error(error);
        }
      });
  }
  ResetForm(){
    this.VotantesForm.reset();
  }
}
