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
})
export class CardPageVisitsComponent implements OnInit {
exportToExcel() {
throw new Error('Method not implemented.');
}
  UsuarioForm: FormGroup;
  isUpdating: boolean = false;
  formData: any;
  constructor(
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private mensajeService: MensajeService,
    ) {
      this.UsuarioForm = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
        apellidoPaterno: ['',Validators.required],
        apellidoMaterno: ['',Validators.required],
        password: ['',Validators.required],
        correo: ['', [Validators.required, Validators.minLength(10)]],
        rolId: ['',Validators.required],
        Estatus: [false, [Validators.required]]

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
  }

  toggleEstatus() {
    const estatusControl = this.UsuarioForm.get('Estatus');

    if (estatusControl) {
      estatusControl.setValue(estatusControl.value === 1 ? 0 : 1);
    }
  }

  obtenerRoles() {
    this.usuariosService.getRoles().subscribe(
      (roles: Roles[]) => {
        console.log('Datos:', roles);
        this.usuarios = this.usuarios;
      }
    );
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
            this.mensajeService.mensajeExito('Programa social borrado correctamente');
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
        this.mensajeService.mensajeExito("usuario agregado Exitosamente");
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
      Nombre: usuarios.nombre,
      Apellidopaterno: usuarios.apellidoPaterno,
      Apellidomaterno: usuarios.apellidoMaterno,
      Correo: usuarios.correo,
      Contraseña: usuarios.password,
      rolId: usuarios.RolId,
    });
    this.formData = this.UsuarioForm.value;
    console.log(this.UsuarioForm.value);
  }
  exportarDatosAExcel() {
    const datosParaExportar = this.usuarios.map(usuarios => {
      return {
        'Nombre': usuarios.nombre,
        'Apellido Paterno': usuarios.apellidoPaterno,
        'Apellido Materno': usuarios.apellidoMaterno,
        "Correo":usuarios.correo
      };
    });
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosParaExportar);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.guardarArchivoExcel(excelBuffer, 'candidatos.xlsx');
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
