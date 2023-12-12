import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MensajeService } from "src/app/pages/core/services/mensaje.service";
import { UsuariosService } from "src/app/pages/core/services/usuario.service";
import { Roles } from "src/app/pages/models/roles";
import { Usuarios } from "src/app/pages/models/usuario";
import * as XLSX from 'xlsx';


@Component({
  selector: "app-card-page-visits",
  templateUrl: "./card-page-visits.component.html",
  styleUrls: ["./card-page-visits.component.css" ],
})
export class CardPageVisitsComponent implements OnInit {

  UsuarioForm: FormGroup;
  isUpdating: boolean = false;
  formData: any;
  toggleValue = true;
  constructor(
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private mensajeService: MensajeService,
    ) {
      this.UsuarioForm = this.formBuilder.group({
        id: [null],
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
        apellidoPaterno: ['', Validators.required],
        apellidoMaterno: ['', Validators.required],
        password: ['', Validators.required],
        correo: ['', [Validators.required, Validators.minLength(10), Validators.email]],
        estatus: ['', Validators.required],
        RolId: ['', Validators.required],
      });


    }

  showModal = false;
  usuarios: Usuarios[] = [];

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

  ngOnInit(): void {
    this.obtenerUsuarios();
  }
  ResetForm() {
    this.UsuarioForm.reset();
    this.toggleValue = true;
  }

  toggleEstatus() {
    const estatusControl = this.UsuarioForm.get('Estatus');

    if (estatusControl) {
      estatusControl.setValue(estatusControl.value === 1 ? 0 : 1);
    }
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
  idToUpdate2!: number;

  editarUsuario() {
    const usuarioFormValue = { ...this.UsuarioForm.value };
    this.usuariosService.putPrograma(this.idToUpdate2, usuarioFormValue).subscribe({

      next: () => {
        this.mensajeService.mensajeExito("Usuario actualizado con éxito");
        this.ResetForm();
        this.actualizarTabla();
        console.log(usuarioFormValue);
        this.closeModal();
      },
      error: (error) => {
        this.mensajeService.mensajeError("Error al actualizar usuario");
        console.error(error);
        console.log(usuarioFormValue);
      }
    });
  }

  eliminarUsuario(id: number) {
    this.mensajeService.mensajeAdvertencia(
      `¿Estás seguro de eliminar el usuario`,
      () => {
        this.usuariosService.deleteUsuario(id).subscribe({
          next: () => {
            this.mensajeService.mensajeExito('Usuario borrado correctamente');
            this.actualizarTabla();
          },
          error: (error) => this.mensajeService.mensajeError(error)
        });
      }
    );
  }


  agregar() {
    // Copia los valores del formulario
    const usuarioFormValue = { ...this.UsuarioForm.value };

    this.usuariosService.postUsuario(usuarioFormValue).subscribe({
      next: () => {
        this.ResetForm();
        this.mensajeService.mensajeExito("Usuario agregado Exitosamente");
        this.actualizarTabla();
        this.closeModal();
      },
      error: () => {
        this.mensajeService.mensajeError("Error al agregar usuario");
      }
    });
  }

  submit() {
    if (this.isUpdating) {
      this.editarUsuario();
    } else {
      this.agregar();
    }
  }

  actualizarTabla() {
    this.usuariosService.getUsuarios().subscribe(
      (usuarios: Usuarios[]) => {
        console.log('Datos actualizados:', usuarios);
        this.usuarios = usuarios;
      }
    );
  }

  setDataModalUpdate(usuarios: Usuarios) {
    this.isUpdating = true;
    this.idToUpdate2 = usuarios.id;
    this.UsuarioForm.patchValue({
      id: usuarios.id,
      nombre: usuarios.nombre,
      apellidoPaterno: usuarios.apellidoPaterno,
      apellidoMaterno: usuarios.apellidoMaterno,
      correo: usuarios.correo,
      password: usuarios.password,
      estatus: usuarios.estatus,
      RolId: usuarios.RolId,
    });
    this.formData = this.UsuarioForm.value;
    console.log(this.UsuarioForm.value);
  }
  exportarDatosAExcel() {
    if (this.usuarios.length === 0) {
      console.warn('La lista de usuarios está vacía. No se puede exportar.');
      return;
    }

    const datosParaExportar = this.usuarios.map(usuario => {
      return {
        'ID': usuario.id,
        'Nombre': usuario.nombre,
        'Apellido Paterno': usuario.apellidoPaterno,
        'Apellido Materno': usuario.apellidoMaterno,
        'Correo': usuario.correo,
        'Contraseña': usuario.password,
        'Rol': usuario.nombreRol,
        'Estatus': usuario.estatus,
        'Rol ID': usuario.RolId
      };
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosParaExportar);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.guardarArchivoExcel(excelBuffer, 'usuarios.xlsx');
  }

  guardarArchivoExcel(buffer: any, nombreArchivo: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url: string = window.URL.createObjectURL(data);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

