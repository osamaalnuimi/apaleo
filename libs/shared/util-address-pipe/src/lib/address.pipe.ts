import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '@apaleo/shared/util-models';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform(value: Address): string {
    return `${value.address}, ${value.city}, ${value.state}, ${value.postalCode}`;
  }
}
