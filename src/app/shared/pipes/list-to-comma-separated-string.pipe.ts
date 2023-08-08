import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'listToCommaSeparatedString',
})
export class ListToCommaSeparatedStringPipe implements PipeTransform {
    transform(value: any[], property: string): string {

        if (!value || !Array.isArray(value)) {
            return '';
        }

        const propertyValues = value.map((item) => item[property]);
        return propertyValues.join(', ');
    }
}
