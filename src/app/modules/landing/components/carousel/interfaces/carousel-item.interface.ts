import { ICarouselTitle } from './';

export interface ICarouselItem {
  id: number;
  image: string;
  title?: ICarouselTitle;
  subtitle?: string;
  link?: string;
  order?: number;
  marginLeft?: number;
  isActive?: boolean;
}
