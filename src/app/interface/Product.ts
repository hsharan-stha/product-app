export interface Product{
  id?:string,
  label:string,
  price:string,
  isFavouriteOf?:number[]
  checked?:boolean;
}
