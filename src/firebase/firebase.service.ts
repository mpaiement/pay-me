import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { getDatabase } from 'firebase-admin/database';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: admin.app.App,
  ) {}

  async saveData(amountUser: number, amountMarchand: number) {
    try {
      const db = getDatabase();
      const ref = db.ref('money');

      ref.set({
        amountUser,
        amountMarchand,
        timestamp: Date.now(),
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
