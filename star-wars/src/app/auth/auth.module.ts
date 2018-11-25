import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';
import { MovieBlockComponent } from './movie-block/movie-block.component';
import { MovieBlockDetailComponent } from './movie-block-detail/movie-block-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    AuthComponent,
    MovieBlockComponent,
    MovieBlockDetailComponent
  ],
  providers: [
    AuthService
  ]

})
export class AuthModule { }
