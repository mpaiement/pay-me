import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import path from 'path';
// import { getDatabase } from 'firebase-admin/database';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: admin.app.App,
  ) {}

  private getDatabase() {
    return this.firebaseApp.database();
  }
  async addData(path: string, data: any): Promise<void> {
    try {
      const db = this.getDatabase();
      const ref = db.ref(path);
      const x= await ref.set({ ...data, timestamp: Date.now() });
      console.log("🚀 ~ FirebaseService ~ addData ~ x:", x)
    } catch (error) {
      console.log("🚀 ~ FirebaseService ~ addData ~ error:", error)
      throw new BadRequestException(error);
    }
  }
}
