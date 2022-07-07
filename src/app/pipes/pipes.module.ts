import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentDatePipe } from './moment-date.pipe';



@NgModule({
  declarations: [
    MomentDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MomentDatePipe,
  ]
})
export class PipesModule { }
