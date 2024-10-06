import admin from "firebase-admin";

// import serviceAccount from '../firebase-service.json';

// admin.initializeApp({
//   // credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
// });

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export default admin;
