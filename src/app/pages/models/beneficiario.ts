export interface Beneficiario {
  id: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  domicilio: string;
  sexo: number;
  curp: string;
  latitud: number;
  longitud: number;
  estatus: boolean;
  municipioId: number;
  programaSocialId: number;
  nombreCompleto:string
}
