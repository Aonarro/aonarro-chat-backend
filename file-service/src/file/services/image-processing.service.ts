// image-processing.service.ts

import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageProcessingService {
  async processImage(imageBuffer: Buffer): Promise<Buffer> {
    try {
      return await sharp(imageBuffer).jpeg({ quality: 80 }).toBuffer();
    } catch (error) {
      throw new Error('Error processing image: ' + error.message);
    }
  }
}
