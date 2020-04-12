import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'domain'
})
export class DomainPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? new URL(value).hostname.replace('www.', '') : '';
  }

}
