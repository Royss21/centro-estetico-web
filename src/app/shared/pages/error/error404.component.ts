import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component {

}
