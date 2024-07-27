import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if(!value) return [];
    if(args[0]?.label==="") return value;
    const searchText= args[0]?.label.toLowerCase();
    return value.filter((i:any)=>i.label.toLowerCase().includes(searchText));
  }

}
