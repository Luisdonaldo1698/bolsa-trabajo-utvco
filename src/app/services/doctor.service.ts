import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { RegistrarSintomasModel } from '../models/registrar-sintomas.model';
import { map, finalize } from 'rxjs/operators';
import { RecetaModel } from '../models/receta.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private registrosCollection: AngularFirestoreCollection<RegistrarSintomasModel>;
  private recetaCollection: AngularFirestoreCollection<RecetaModel>;
  private doctorCollection: AngularFirestoreCollection<UserModel>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) {
    this.registrosCollection = afs.collection<RegistrarSintomasModel>('registros');
    this.recetaCollection = afs.collection<RecetaModel>('recetas');
    this.doctorCollection = afs.collection<UserModel>('users');
  }

  saveRegistro(registro: RegistrarSintomasModel){
    localStorage.setItem('registro', JSON.stringify(registro));
  }

  getRegistro(): RegistrarSintomasModel{
    return JSON.parse(localStorage.getItem('registro')?? '') as RegistrarSintomasModel;
  }

  clearRegistro(){
    localStorage.removeItem('registro');
  }

  listarRegistros(fecha: string){
    this.registrosCollection = this.afs.collection<RegistrarSintomasModel>('registros', ref => ref.where('fecha', '==', fecha));
    return this.registrosCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const datos = a.payload.doc.data() as RegistrarSintomasModel;
          const id = a.payload.doc.id;
          return { id, ... datos }
        })
      )
    );
  }

  generarReceta(receta: RecetaModel){
    return this.recetaCollection.add(receta);
  }

  updateRegistroConReceta(recetaUrl: string, registroId: string ): Promise<void>{
    return this.registrosCollection.doc(registroId).update({recetaUrl});
  }

  subirPdfFirebase(nombre: string, archivo: any): Promise<string> {
    return new Promise((resolve, reject) => {

      const filePath = `${nombre}.pdf`;
      const fileRef = this.storage.ref(filePath);
      const tarea = this.storage.upload(filePath, archivo);
      tarea.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlPdf => {
            resolve(urlPdf)
          }, err => {
            reject(err);
          })
        })
      ).subscribe();

    });
  }

  updateProfile(id: string, user: UserModel): Promise<void>{
    return this.doctorCollection.doc(id).update(user);
  }
}
