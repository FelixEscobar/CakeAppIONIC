import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsersService } from '../api/users/users.service';
import { StorageService } from '../shared/services/storage-service/storage.service';
import { ToastService } from '../shared/services/toast-service/toast-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public formGroupSignin: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private usersService:UsersService,
    private toastService:ToastService,
    private navCtrl:NavController,
    private storageService:StorageService
    ) { }

  ngOnInit() {
    this.initFormSignin();
  }  

  private initFormSignin():void {
   this.formGroupSignin = this.formBuilder.group({
     email: ['',[Validators.required, Validators.email]],
     password: ['',[Validators.required, Validators.minLength(3)]],
   });
  }

  public submitSignin() {
    const signin = this.formGroupSignin.value;
    console.log('signin',signin);
    this.validateSignin(signin);
  }

  private validateSignin (data:any): void {
    this.usersService.signin(data).subscribe(response => {
      this.storageService.set('token',response.token);
      this.navCtrl.navigateRoot(['/home']);
      }, error => {      
      this.toastService.showToastMessage("Email/Password invalid. Please retry");
    });
  }
}
