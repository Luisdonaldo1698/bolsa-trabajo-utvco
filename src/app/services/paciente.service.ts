import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { RegistrarSintomasModel } from '../models/registrar-sintomas.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private registrosCollection: AngularFirestoreCollection<RegistrarSintomasModel>;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.registrosCollection = afs.collection<RegistrarSintomasModel>('registros');
  }

  registrarSintomas(sintomas: RegistrarSintomasModel){
    return this.registrosCollection.add(sintomas)
  }

  listarRegistros(userId: string){
    this.registrosCollection = this.afs.collection<RegistrarSintomasModel>('registros', ref => ref.where('paciente.userId', '==', userId));
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
}
