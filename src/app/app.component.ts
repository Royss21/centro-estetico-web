import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { LayoutComponent } from '@layout/layout.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-root',
  styleUrls  : ['./app.component.scss'],
  templateUrl: './app.component.html',
  imports:[
    SharedModule,
    LayoutComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {

}
