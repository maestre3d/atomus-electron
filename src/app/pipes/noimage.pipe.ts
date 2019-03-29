import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(image: any): string {
    if ( !image ) {
      return 'assets/img/generic-user.jpg';
    } else {
      return `http://189.237.67.145:3977/api/user/pic/${image}`;
    }
  }

}
