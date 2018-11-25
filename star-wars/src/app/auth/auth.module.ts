import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';
import { MovieBlockComponent } from './movie-block/movie-block.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    AuthComponent,
    MovieBlockComponent
  ],
  providers: [
    AuthService
  ]

})
export class AuthModule { }
