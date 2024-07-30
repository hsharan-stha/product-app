import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFavouriteComponent } from './product-favourite.component';
import {ProductService} from "../../../service/product/product.service";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('ProductFavouriteComponent', () => {
  let component: ProductFavouriteComponent;
  let fixture: ComponentFixture<ProductFavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFavouriteComponent],
      providers:[ProductService,HttpClient,HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
