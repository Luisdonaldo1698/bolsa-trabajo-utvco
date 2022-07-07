import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showAlert(title: string, description: string, type: SweetAlertIcon){
    Swal.fire({
      title,
      text: description,
      icon: type,
    });
  }

  showToast(title: string, icon: SweetAlertIcon){
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    toast.fire({
      icon,
      title,
    })
  }
}
