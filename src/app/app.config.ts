import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "ugy-projekt-koveto", appId: "1:900736686912:web:25947f3c73850067d9f8a5", storageBucket: "ugy-projekt-koveto.firebasestorage.app", apiKey: "AIzaSyBO75h6PZdS_ybkmYXQB8DW4g7Ezyulg7Y", authDomain: "ugy-projekt-koveto.firebaseapp.com", messagingSenderId: "900736686912" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
