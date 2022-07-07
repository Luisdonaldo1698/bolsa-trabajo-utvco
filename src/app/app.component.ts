import { AngularFireMessaging} from '@angular/fire/compat/messaging';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']


})
export class AppComponent {
  

  
constructor(

  
  private messaging: AngularFireMessaging,

  ){
  }

  ngOnInit(){
  this.requestPermission();
  this.listenNotifications();
  }



requestPermission(){
this.messaging.requestToken
.subscribe(token => {
  console.log(token);
});
}
listenNotifications(){
  this.messaging.messages
  .subscribe(message =>{
    console.log(message);
    
  });
}

  installEvent: any = null;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event){
    console.log(event);
    event.preventDefault();
    this.installEvent = event;
  }

  installByUser(){
    if(this.installEvent){
      this.installEvent.prompt();
      this.installEvent.userChoice.then((resp: any) => {
        console.log(resp);
      });
    }
  }
}
