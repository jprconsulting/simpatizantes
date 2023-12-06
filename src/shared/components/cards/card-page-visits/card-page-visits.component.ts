import { Component, OnInit } from "@angular/core";
import { UsuariosService } from "src/app/pages/core/services/usuario.service";
import { Usuarios } from "src/app/pages/models/usuario";

@Component({
  selector: "app-card-page-visits",
  templateUrl: "./card-page-visits.component.html",
})
export class CardPageVisitsComponent implements OnInit {
  constructor(private usuariosService: UsuariosService) {}
  showModal = false;
  usuarios: Usuarios[] = [];

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  editarUsuario(usuario: Usuarios) {
  }

  eliminarUsuario(usuarioId: number) {
  }
}
