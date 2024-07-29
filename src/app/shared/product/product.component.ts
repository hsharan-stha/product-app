import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FilterPipe} from "../../pipe/filter.pipe";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {Observable} from "rxjs";
import {Product} from "../../interface/Product";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    AsyncPipe,
    FilterPipe,
    InfiniteScrollDirective,
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  constructor(private authService:AuthService) {
  }

  @Input() public products$:Observable<Product[]>;
  @Input() public searchText:string;

  @Output() public scrollEvent:EventEmitter<boolean>=new EventEmitter<boolean>();
  @Output() public addToFavouriteEvent:EventEmitter<Product>=new EventEmitter<Product>();


  public scrollFn():void{
    this.scrollEvent.emit(true);
  }

  public getRandomImage(i:number):string{
    return `https://picsum.photos/200/300?random=${i}`
  }

  public addToFavourite(data:Product){
    this.addToFavouriteEvent.emit(data);
  }

  public checkIsAlreadyLiked(data:Product):boolean{
    return <boolean>data?.isFavouriteOf?.includes(<number>this.authService.getUserDetails()?.id);
  }

}
