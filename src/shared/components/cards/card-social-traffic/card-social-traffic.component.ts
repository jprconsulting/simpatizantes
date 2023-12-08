import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BeneficiarioService } from "src/app/pages/core/services/Beneficiario.service";
import { MensajeService } from "src/app/pages/core/services/mensaje.service";
import { MunicipiosService } from "src/app/pages/core/services/municipios.service";
import { ProgramaService } from "src/app/pages/core/services/programasocial";
import { Beneficiario } from "src/app/pages/models/beneficiario";
import { Municipios } from "src/app/pages/models/municipios";
import { Prograsmasocial } from "src/app/pages/models/programasocial";
declare const google: any;
@Component({
  selector: "app-card-social-traffic",
  templateUrl: "./card-social-traffic.component.html",
})
export class CardSocialTrafficComponent{
  municipios: Municipios[] = [];
  prograsmasocial: Prograsmasocial [] = [];
  beneficiarios: Beneficiario[] = [];
  SocialForm: FormGroup;
  idToUpdate2!: number;
  isUpdating: boolean = false;
  sexos: { [key: number]: string } = {
    1: 'Masculino',
    2: 'Femenino'
  };

  municipiosOptions: {id: number, nombre: string, label: string }[] = [];
  programasOptions: {id: number, nombre: string, label: string }[] = [];
  formData: any;

  constructor(
    private programaService: ProgramaService,
    private municipiosService: MunicipiosService,
    private beneficiarioService: BeneficiarioService,
    private mensajeService: MensajeService,
    private formBuilder: FormBuilder,

    )
    {
      this.SocialForm = this.formBuilder.group({
        id: [null],
        nombres: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
        apellidoPaterno: ['',Validators.required],
        apellidoMaterno: ['',Validators.required],
        fechaNacimiento: ['', ],
        domicilio: ['',Validators.required],
        sexo: ['',Validators.required],
        curp: ['',Validators.required],
        latitud: ['',Validators.required],
        longitud: ['',Validators.required],
        estatus: [true, [Validators.required]],
        municipioId: ['',Validators.required],
        programaSocialId: ['',Validators.required],

      });
    }
  showModal = false;


  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
  ngOnInit() {
    this.obtenerMunicipios();
    this.obtenerBeneficiarios();
    this.ObtenerProgramas();
  }

  obtenerBeneficiarios() {
    this.beneficiarioService.getBeneficiario().subscribe(
      (beneficiarios: Beneficiario[]) => {
        console.log('Datos de beneficiarios recibidos:', beneficiarios);
        this.beneficiarios = beneficiarios;
      },
      (error: any) => {
        console.error('Error al obtener beneficiarios:', error);
      }
    );
  }

  obtenerMunicipios() {
    if (this.municipiosService) {
      this.municipiosService.getMunicipios().subscribe(
        (municipios: Municipios[]) => {
          console.log('Datos de municipios recibidos:', municipios);
          this.municipios = municipios;
          this.municipiosOptions = municipios.map(municipio => ({
            id: municipio.id,
            nombre: municipio.id.toString(),
            label: municipio.nombre
          }));
        },
        (error: any) => {
          console.error('Error al obtener municipios:', error);
        }
      );
    } else {
      console.error('El servicio de municipios no está definido.');
    }
  }

  ObtenerProgramas(){
    if (this.programaService) {
      this.programaService.getPrograma().subscribe(
        (prograsmasocial: Prograsmasocial[]) => {
          console.log('Datos de programas sociales recibidos:', prograsmasocial);
          this.prograsmasocial = prograsmasocial;
          this.programasOptions = prograsmasocial.map(prograsmasocial => ({
            id: prograsmasocial.id,
            nombre: prograsmasocial.id.toString(),
            label: prograsmasocial.nombre
          }));
        },
        (error: any) => {
          console.error('Error al obtener programas:', error);
        }
      );
    } else {
      console.error('El servicio de programas no está definido.');
    }
  }


  ResetForm() {
    this.SocialForm.reset();
  }

  actualizarTabla() {
    this.beneficiarioService.getBeneficiario().subscribe(
      (beneficiarios: Beneficiario[]) => {
        console.log('Datos actualizados:', beneficiarios);
        this.beneficiarios = beneficiarios;
      }
    );
  }

  submit() {
    if (this.isUpdating) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }

  agregar() {
    const socialFormValue = { ...this.SocialForm.value };
    delete socialFormValue.id;
    this.beneficiarioService.postVotante(socialFormValue).subscribe({
      next: () => {
        this.ResetForm();
        this.mensajeService.mensajeExito("Beneficiario agregado exitosamente");
        this.actualizarTabla();
        this.closeModal();
      },
      error: (error) => {
        this.mensajeService.mensajeError("Error al agregar el beneficiario");
      }
    });
  }

  actualizar() {
    const socialFormValue = { ...this.SocialForm.value };
    console.log('ferwohfw',this.idToUpdate2);
    this.beneficiarioService.putBeneficiario(this.idToUpdate2, socialFormValue).subscribe({

      next: () => {
        this.mensajeService.mensajeExito("Beneficiario actualizado con éxito");
        this.ResetForm();
        this.actualizarTabla();
        console.log(socialFormValue);
        this.closeModal();
      },
      error: (error) => {
        this.mensajeService.mensajeError("Error al actualizar el beneficiario");
        console.error(error);
        console.log(socialFormValue);
      }
    });
  }

  borrar(id: number, beneficiario: string) {
    this.mensajeService.mensajeAdvertencia(
      `¿Estás seguro de eliminar el beneficiario: ${beneficiario}?`,
      () => {
        this.beneficiarioService.deleteBeneficiario(id).subscribe({
          next: () => {
            this.mensajeService.mensajeExito('Beneficiario borrado correctamente');
            this.actualizarTabla();
          },
          error: (error) => this.mensajeService.mensajeError(error)
        });
      }
    );
  }

  setDataModalUpdate(beneficiario: Beneficiario) {
    this.isUpdating = true;
    this.idToUpdate2 = beneficiario.id;
    this.SocialForm.patchValue({
      id: beneficiario.id,
      nombres: beneficiario.nombres,
      apellidoPaterno: beneficiario.apellidoPaterno,
      apellidoMaterno: beneficiario.apellidoMaterno,
      fechaNacimiento: beneficiario.fechaNacimiento,
      domicilio: beneficiario.domicilio,
      sexo: beneficiario.sexo,
      curp: beneficiario.curp,
      latitud: beneficiario.latitud,
      longitud: beneficiario.longitud,
      estatus: beneficiario.estatus,
      municipioId: beneficiario.municipioId,
      programaSocialId: beneficiario.programaSocialId,
    });
    this.formData = this.SocialForm.value;
    console.log(this.SocialForm.value);
  }
}
