import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class CriptUtil {

  public async generateHashByValue(plainText: string) {
    return hash(plainText, 8);
  }

  public async compareValueAndHash(plainText: string, hash: string) {
    return compare(plainText, hash);
  }
}