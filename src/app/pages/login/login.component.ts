import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from '../models/login';
import { SecurityService } from '../core/services/security.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from '../core/services/mensaje.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formUserLogin!: FormGroup;
  user!: AppUser;
  returnUrl = 'panel/bienvenida';


  constructor(
    private securityService: SecurityService,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private mensajeService: MensajeService,

  ) { }

  ngOnInit(): void {
    this.createFormUserLogin();
  }

  login() {
    this.user = this.formUserLogin.value as AppUser;
    this.spinnerService.show();
    this.securityService.login(this.user).subscribe({
      next: () => {
        setTimeout(() => {
          this.spinnerService.hide();
          this.router.navigateByUrl(this.returnUrl);
        }, 500);
      },
      error: (error: string) => {
        this.mensajeService.mensajeError(error);
        this.spinnerService.hide();
      }
    });
  }


  createFormUserLogin() {
    this.formUserLogin = this.formBuilder.group({
      email: ['test@test.com', Validators.compose([
        Validators.required, Validators.minLength(3)
      ])],
      password: ['admin123', Validators.compose([
        Validators.required, Validators.minLength(3)
      ])]
    });
  }
}
