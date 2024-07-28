import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FilterPipe} from "../../pipe/filter.pipe";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {Observable} from "rxjs";
import {Product} from "../../interface/Product";

@Component({
  selector: 'app-product',
  standalone: true,
    imports: [
        AsyncPipe,
        FilterPipe,
        InfiniteScrollDirective,
        NgForOf,
        NgIf
    ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input() public products$:Observable<Product[]>;
  @Input() public searchText:string;

  @Output() public scrollEvent:EventEmitter<boolean>=new EventEmitter<boolean>();


  public scrollFn():void{
    this.scrollEvent.emit(true);
  }

}
