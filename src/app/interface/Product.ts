export interface Product{
  id?:string,
  label:string,
  price:string | number,
  isFavouriteOf?:number[]
  checked?:boolean;
}
