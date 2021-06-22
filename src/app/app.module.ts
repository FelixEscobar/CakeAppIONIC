import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
//import { BarcodeScanner } from '@ionic-native/BarcodeScanner/ngx'; 


import { AuthInterceptorService} from './shared/interceptors/auth-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    IonicStorageModule.forRoot({
      name:"db_cakeapp",
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage, Drivers.SecureStorage]
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}
 //   BarcodeScanner
],
  bootstrap: [AppComponent],
})
export class AppModule {}
