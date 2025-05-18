import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(firstName: string, lastName: string): string {
    if (!firstName || !lastName) return '';
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
}
