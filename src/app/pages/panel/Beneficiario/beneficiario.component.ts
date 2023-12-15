import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeneficiarioService } from '../../core/services/Beneficiario.service';
import { Beneficiario } from '../../models/beneficiario';
import { ProgramaService } from '../../core/services/programasocial.service';
import { Prograsmasocial } from '../../models/programasocial';

declare const google: any;


@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.css']
})
export class BeneficiarioComponent implements OnInit { 
  ngOnInit() {

  }
}