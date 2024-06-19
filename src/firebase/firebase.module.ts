import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: () => {
    const firebaseConfig = {
      type: 'service_account',
      project_id: 'mobile-paiement',
      private_key_id: '69a08186e9b3bd6d41eedc3a4a3b4283b7820929',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSeHVph7sRQl7h\n9TLStvjHFE+y0v9y6w4bBVTxKxXm+iu4JmtMLQRBvi5BvUNW0OXFspJPum6VRwdG\nei9Yd+PxP48RI2SgCK/nh1s0xK8uAR5ieuLohL3/4y1PSKRoD4zUhhIHgl/rpjbA\nZeHm/e0mSCcXjJNWlg/JyjHPzmire5Zdgor2u9p/tKWT67/K3VWIfEDK9h6vnnd8\nI5dVyvrti9+PRqAzvZHpaMR1lZUbguEcWVlg+yRzh9IgmtX4c7KX/kL4+0paAJJh\nHxAvx47j9EmfwTNbtgJ+cSK6ZYnv27iCaqvissdaVmOPVKbP2/9Qx4LkCz9A1d0Q\nsee2ylqnAgMBAAECggEAM6olLEAI0B5KO05c6PPIUtouDDgWQ8fmgQSIiuDoMfhU\nNhKcQSlFw7ujEDkc6BlEZgjFOLQLhDJY21iP+bgIaMaQ4ISfJVesknmcDnJ/jBvz\nMPp4a9p153QFQdKTpQW4LM0ybMx4rlhxVT5NO0424jBRBEtaOaWBf6fWHWxOLlWo\nXC9HIi5TDHWfE0IfylJ88ZLJClLR5mJ7Ti4myl2A57IMH/C9HMlGZ9xmOvfp7IrZ\nPTK3sDTqM3vmebXZlBpNARlR8A8fveOdiyGkMoVM3NDg1CJ/5994cLgL4Wkc3Pdf\nYCKY2Cgn+WH8leMKOQBjZxNEzUTzozfUPoXm6HzTZQKBgQD5ffFG6/bKS2zAUgRU\nVVigQfxWW6YyQx0OCMpFQEBx6T7FyEhpidIaVyF1hVy0n0JAmMQkChkii1EjBAvD\no9TXvr2g61pWo77a+DjIUN55SwLf0kjppaWfFpWoEMmIyxjGd8L9y5Iqi2QFaX/R\nEgqljMhWBRYrOmiPGO0fCSctPQKBgQDX9fBbTrgG4/9Gr8GLzZOM+YyASRt8maDu\nuBwMVlmbQgMwElPE0GATBenNYISLeJJ8oSZcQXpubV8s3LHmh+Tg01f1+u4T0O/k\nm00KoIgaxndZuvU2TKR8Qj1BPcJh2HJzw5qfr1/xsAU/v4BBdrV4/tMG1JHxHgbF\nGECw/lotswKBgQDImKdm45AQxKYS157dg6V3bLaLZLLy1J1GzHB9T5TBQc0Tzt3R\n5VsFjKq9R9Xq7+Wf9HQ3mdrtuGArLDSdP1uBf74N5U1EPfHVMyDMhqDpmxMbjILN\nQT8x80Gu2JiBoPIxmNcxofzKsjpgU5vOKJhg1Rm6d+qEJTkuXNdCTeSu7QKBgDei\nONgc0FWeGJ4qGs8cF33Cr8pAix8vKIE21qrq98yCVfXlUsUp9QYRiOiKi7quRfZr\nQUmU6KhX7qPM+ttreK/eYhORIBHkylf3FgK91jInnIl2G0NwvRLxsXwEH/Y630kp\nQ8UNVccaVE/W0oCKxzczVkO1MR+PX6kYlVnDPJH3AoGBAIaBkXBVMUf3DaI5q0vk\nv7YsipEP6heV9/dut7PpUb9vtQk+V0dzFCSj1oi0BjGXHfLGsVN22B57Ua+hrcKb\nz7UPoXAtPmLGQcZ9biP3VamLdQm59ebG1i85CbXD2c7kpdo0D+tPP81ADOKkNbAI\nuDt3PFrCaJ+Nlhgrdq5B0KJN\n-----END PRIVATE KEY-----\n',
      client_email:
        'firebase-adminsdk-n0vgm@mobile-paiement.iam.gserviceaccount.com',
      client_id: '108656401985640361839',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-n0vgm%40mobile-paiement.iam.gserviceaccount.com',
      universe_domain: 'googleapis.com',
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};

@Global()
@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider],
  exports: [],
})
export class FirebaseModule {}
