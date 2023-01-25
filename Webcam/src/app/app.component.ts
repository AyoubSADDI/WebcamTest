import { Component,OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam/public_api';
import { Observable, Subject } from 'rxjs';
import { ImageService } from './image.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  stream:any=null;
  status="";
  trigger:Subject<void> = new Subject();
  previewImage:string='';
  btnLabel:string="Take picture";
  FirstName="";
  LastName="";

  constructor(private imageService:ImageService) { }

  ngOnInit():void {
    console.log(this.FirstName);
    console.log(this.LastName);

  }
  

  get $trigger(): Observable<void> {
   return this.trigger.asObservable();
  }

  proceed(){
    console.log(this.previewImage);
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.setAttribute("href", this.previewImage);
    link.setAttribute("download", this.FirstName+this.LastName+".jpg");
    link.click();
    setTimeout(()=>{
      this.imageService.uploadImage(this.FirstName+this.LastName+".jpg").subscribe((res)=>{
        console.log(res);
        console.log("setTimeAout")
      });
    },5000)
  
  }

  snapshot(event: WebcamImage){
    console.log(event);
    this.previewImage=event.imageAsDataUrl;
    this.btnLabel="other capture";

  }
  checkPermissions(){
    console.log('dfs')
    navigator.mediaDevices.getUserMedia({
      video:{
        width:500,
        height:500
      }
    }).then((res)=>{
     console.log(res);
     this.stream=res;
     this.status="My camera is accessing"
    }).catch((err)=>{

     console.log(err);
     if(err?.message === 'Permission denied'){
      this.status="Permission denied please try again by  approving the access";
     }
     else {
      this.status="You may not having camera system, Please try again ..."
     }
    })
  }
  captureImage(){
  this.trigger.next();
  }
}
