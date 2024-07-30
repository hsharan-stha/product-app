import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
export class ProductComponent implements OnInit{

  @ViewChild("scrollContainer") scrollContainer:ElementRef;

  constructor(private authService:AuthService) {
  }

  ngOnInit() {
  }

  @Input() public products$:Observable<Product[]>;
  @Input() public searchText:string;

  @Output() public scrollEvent:EventEmitter<boolean>=new EventEmitter<boolean>();
  @Output() public addToFavouriteEvent:EventEmitter<Product>=new EventEmitter<Product>();


  public scrollFn():void{
    const container = this.scrollContainer.nativeElement;
    const previousScrollHeight=container.scrollHeight;
    const previousScrollTop=container.scrollTop;


    this.scrollEvent.emit(true);



    setTimeout(()=>{
      container.scrollTop=previousScrollTop+(container.scrollHeight - previousScrollHeight)
      console.log(container.scrollTop);

    },520)
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
