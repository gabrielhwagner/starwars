import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    PreloaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    PreloaderComponent,
    FooterComponent
  ]

})
export class SharedModule { }
