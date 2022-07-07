import { UserModel } from './user.model';
export interface RegistrarSintomasModel{
  id?: string;
  descripcion: string;
  gravidez: string;
  diasTranscurridos: number;
  personasConvividas: number;
  oxigenacion: string;
  temperatura: string;
  fecha: string;
  hora: string;
  paciente: UserModel;
  sintomas: SintomasModel;
  recetaUrl?: string;
}

export interface SintomasModel {
  dolorCabeza: boolean;
  diarrea: boolean;
  faltaDeGusto: boolean;
  faltaDeOlfato: boolean;
  vomito: boolean;
  tos: boolean;
  cansancio: boolean;
  dificultadRespiratoria: boolean;
  neumonia: boolean;
}
