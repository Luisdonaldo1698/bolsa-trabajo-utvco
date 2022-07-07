import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UserModel } from '../models/user.model';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private users: AngularFirestoreCollection<UserModel>;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.users = afs.collection<UserModel>('users');
  }

  listarPacientes(){
    this.users = this.afs.collection<UserModel>('users', ref => ref.where('rol', '==', 'paciente'));
    return this.users.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const datos = a.payload.doc.data() as UserModel;
          const id = a.payload.doc.id;
          return { id, ... datos }
        })
      )
    );
  }

  listarDoctores(){
    this.users = this.afs.collection<UserModel>('users', ref => ref.where('rol', '==', 'doctor'));
    return this.users.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const datos = a.payload.doc.data() as UserModel;
          const id = a.payload.doc.id;
          return { id, ... datos }
        })
      )
    );
  }
}
