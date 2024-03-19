import { Component, HostListener, ViewChild } from '@angular/core';
import { CarouselComponent, ContactUsComponent, LocationMapComponent } from '@modules/landing/components';
import { ICarouselItem } from '@modules/landing/components/carousel/interfaces';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    CarouselComponent,
    ContactUsComponent,
    LocationMapComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  carouselItems: ICarouselItem[] = [
    {
      id:0,
      image:'https://img.freepik.com/fotos-premium/modelo-bikini-posando-playa_120960-2044.jpg',
      subtitle: 'aqui va el contenido'
    },
    {
      id:1,
      image:'https://cdn.wallpapersafari.com/75/26/Isb5Gp.jpg',
      subtitle: 'aqui va el contenido'
    }
  ]

}
