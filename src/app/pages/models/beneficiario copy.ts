export interface Beneficiario
    {
        Id: number;
        Nombres: string;
        ApellidoPaterno: string;
        ApellidoMaterno: string;
        FechaNacimiento: Date;
        Domicilio: string;
        Sexo: number;
        CURP: string;
        Estatus: boolean;
	    MunicipioId: number;
    }