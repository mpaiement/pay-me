import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ConfigService } from '@nestjs/config';
import admin, { ServiceAccount } from 'firebase-admin';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  useFactory: async (configService: ConfigService) => {
    if (!admin.apps.length) {
      const projectId = configService.get<string>('FIREBASE_PROJECT_ID');

      const privateKey = configService
        .get<string>('FIREBASE_PRIVATE_KEY')
        .replace(/\\n/g, '\n');

      const clientEmail = configService.get<string>('FIREBASE_CLIENT_EMAIL');

      const databaseURL = `https://mobile-paiement-default-rtdb.firebaseio.com/`;

      const serviceAccount: ServiceAccount = {
        projectId,
        privateKey,
        clientEmail,
      };

      return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL,
      });
    }
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [firebaseProvider, FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
