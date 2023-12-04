import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-bar-prograsmasocial',
  templateUrl: './card-bar-prograsmasocial.component.html',
  styleUrls: ['./card-bar-prograsmasocial.component.css']
})
export class CardBarPrograsmasocialComponent implements OnInit {
  SocialForm!: FormGroup;
  color!: string;
  constructor(
    private formBuilder: FormBuilder,
   
  ) {
    this.color = '';
  }
  showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
  
  ngOnInit() {
    this.creaFormulario();
  }

  creaFormulario() {
    this.SocialForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      Descripcion : ['', [Validators.required, Validators.minLength(10)]],
      Color: [''],
      Estatus : [null, [Validators.required]],
      Acronimo:['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]+$')]],
    })
  }
  ResetForm(){
    this.SocialForm.reset();
    this.SocialForm.reset({ Color: null });
    this.color = '';
  }

}



