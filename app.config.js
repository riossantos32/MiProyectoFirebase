import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  android: {
    package: process.env.ANDROID_PACKAGE || 'com.ZendyMarket.tuapp'
  },
  extra: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    eas: {
      projectId: process.env.EAS_PROJECT_ID || '2192d002-21f2-499e-9076-a3e73eaff425'
    },
    cli: {
      appVersionSource: 'manifest'
    },
    ...config.extra
  }
});
