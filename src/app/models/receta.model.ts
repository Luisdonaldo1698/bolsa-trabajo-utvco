import { MedicamentoModel } from './medicamento.model';
import { UserModel } from './user.model';
export interface RecetaModel {
  recomendacionGeneral?: string;
  fecha: string;
  hora: string;
  paciente: UserModel;
  doctor: UserModel;
  medicamentos?: MedicamentoModel[];
  url?: string;
}
