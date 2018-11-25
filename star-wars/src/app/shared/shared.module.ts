import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PreloaderComponent } from './preloader/preloader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    PreloaderComponent
  ],
  exports: [
    HeaderComponent,
    PreloaderComponent
  ]

})
export class SharedModule { }
