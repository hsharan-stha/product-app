import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductTableComponent} from './product-table.component';
import {ProductService} from "../../../service/product/product.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTableComponent, HttpClientTestingModule],
      providers: [ProductService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
