import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone : true,
  selector: 'app-main',
  templateUrl: './main.component.html',
  providers:[
    CommonModule
  ]
})
export class MainComponent {}
