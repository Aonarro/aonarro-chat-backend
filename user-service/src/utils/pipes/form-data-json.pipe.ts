import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FormDataJsonPipe implements PipeTransform {
  transform(value: any) {
    if (value.data && typeof value.data === 'string') {
      try {
        const jsonData = JSON.parse(value.data);

        return jsonData;
      } catch (_e) {
        throw new BadRequestException('Invalid JSON data');
      }
    }

    return value;
  }
}
