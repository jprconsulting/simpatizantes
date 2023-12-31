import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MensajeService } from "src/app/pages/core/services/mensaje.service";
import { UsuariosService } from "src/app/pages/core/services/usuario.service";
import { Roles } from "src/app/pages/models/roles";
import { Usuarios } from "src/app/pages/models/usuario";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

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
        apellidoPaterno: ['',  [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]+$')]],
        apellidoMaterno: ['',  [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]+$')]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        correo: ['', [Validators.required, Validators.email]],
        estatus: ['', Validators.required],
        RolId: ['', Validators.required],
      });


    }

  showModal = false;
  usuarios: Usuarios[] = [];
  roles: Roles[] = [];

  openModal(): void {
    this.showModal = true;
    this.toggleValue = true;
    if (!this.isUpdating) {
      // Restablecer el formulario si no está en modo de actualización
      this.ResetForm();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.isUpdating = false;
    this.toggleValue = true;
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerRol();
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
  obtenerRol(): void {
    this.usuariosService.getRoles().subscribe(
      (roles) => {
        this.roles = roles;
        console.log('estos son los roles',roles);
      },
      (error) => {
        console.error('Error al obtener roles:', error);
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
    const usuarioFormValue = { ...this.UsuarioForm.value };
    delete usuarioFormValue.id;
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
  buscar: string = '';
  usuarioFiltrado: any [] = [];

  filtrarUsuarios():  any {
    return this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(this.buscar.toLowerCase(),) ||
      usuario.apellidoMaterno.toLowerCase().includes(this.buscar.toLowerCase(),)||
      usuario.apellidoMaterno.toLowerCase().includes(this.buscar.toLowerCase(),)||
      usuario.correo.toLowerCase().includes(this.buscar.toLowerCase(),)
    );

  }
  actualizarFiltro(event: any): void {
    this.buscar = event.target.value;
    this.usuarioFiltrado = this.filtrarUsuarios();
  }
}


