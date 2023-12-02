import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-beneficiario',
  templateUrl: './modal-beneficiario.component.html',
  styleUrls: ['./modal-beneficiario.component.css']
})
export class ModalBeneficiarioComponent {



  showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
