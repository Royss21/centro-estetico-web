import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './shared-material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedMaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedMaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class SharedModule {}
