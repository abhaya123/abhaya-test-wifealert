import { Component } from '@angular/core';
import {ActivePage} from '../active/active';
import { NavController,Platform} from 'ionic-angular';
import {Geofence,Geolocation,SMS} from '@ionic-native';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

radius:number=100;
success:any;
error:any;

  constructor(public navCtrl: NavController,public Platform:Platform) {

     this.Platform.ready().then(()=>{
       Geofence.initialize().then(()=>
          console.log("Geofence Initialized"),
          (err)=>console.log(err)
       )
     });
}

setGeofence(value:number){
  Geolocation.getCurrentposition({
    enableHighAccuracy:true
  }).then((resp)=>{
    var longitude=resp.coords.longitude;
    var latitude=resp.coods.latitude;
    var radius=value;

    let fence={
      id:"myGeofenceId1",
      longitude:longitude,
      latitude:latitude,
      radius:radius
    }

    Geofence.addorupdate(fence).then(
    ()=>this.success=true,
    (err)=>this.error="Failed to add or update fence"
    );

    Geofence.onTransitionRecieved().subscribe(resp=>{
     SMS.send('7977746171','He left the fence');
    })

      this.navCtrl.push(ActivePage);

  }).catch((error)=>{
  this.error=error;
  });

 }
   
}
