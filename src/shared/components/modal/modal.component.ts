import { Component } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  showModal = false;
  roles = ['Director', 'Administrador'];
  areas = ['area1', 'area2'];

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  usuario = {
    rol: ''
  };

  mostrarSelectAreas = false;

  onChangeRol(){
    this.mostrarSelectAreas = this.usuario.rol=='Director';
  }

}
