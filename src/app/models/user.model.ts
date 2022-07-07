export interface UserModel{
  id?: string;
  userId?: string;
  nombre: string;
  email: string;
  password?: string;
  rol: string;
  telefono?: string;
  edad?: string;
  sexo?: string;

  // doctor
  cedula?: string;
}
