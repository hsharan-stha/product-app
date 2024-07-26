import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../interface/Product";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productEndPoint:string=`${environment.apiUrl}product`

  constructor(private httpClient:HttpClient) { }

  updateProduct(data:Product):Observable<Product>{
    console.log(environment.name)
    return this.httpClient.put<Product>(`${this.productEndPoint}/${data?.id}`,data);
  }
  saveProduct(data:Product):Observable<Product>{
    console.log(environment.name)
    return this.httpClient.post<Product>(this.productEndPoint,data);
  }

  findAllProduct():Observable<Array<Product>>{
    return this.httpClient.get<Array<Product>>(this.productEndPoint)
  }

  findById(id:string):Observable<Product>{
    return this.httpClient.get<Product>(`${this.productEndPoint}/${id}`)
  }

  deleteById(id:string):Observable<Product>{
    return this.httpClient.delete<Product>(`${this.productEndPoint}/${id}`)
  }
}
