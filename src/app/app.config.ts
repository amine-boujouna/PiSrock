import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Modules Angular Material
import { MatButtonModule } from '@angular/material/button'; // Si tu utilises des boutons
import { MatIconModule } from '@angular/material/icon'; // Si tu utilises des icônes
import { MatToolbarModule } from '@angular/material/toolbar'; // Si tu utilises des barres d'outils
import { MatInputModule } from '@angular/material/input';  // Si tu utilises des champs de saisie
import { MatFormFieldModule } from '@angular/material/form-field'; // Si tu utilises des champs de formulaire
import { MatCardModule } from '@angular/material/card'; // Pour les cartes
import { SupplierComponent } from './components/supplier/supplier.component'; // Chemin vers votre composant
// Pipes standards
import { CommonModule } from '@angular/common';  // Pour utiliser les pipes standards comme 'currency'

// Icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// Perfect Scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

// Modules de formulaires
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Module central Angular Material
import { MaterialModule } from './material.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      TablerIconsModule.pick(TablerIcons),
      NgScrollbarModule,
      MatCardModule,  // Ajoute MatCardModule
      MatButtonModule,  // Ajoute MatButtonModule si tu utilises des boutons
      MatIconModule,    // Ajoute MatIconModule si tu utilises des icônes
      MatToolbarModule, // Ajoute MatToolbarModule si tu utilises une barre d'outils
      MatInputModule,   // Ajoute MatInputModule si tu utilises des champs de saisie
      MatFormFieldModule, // Ajoute MatFormFieldModule si tu utilises des formulaires
      CommonModule// Ajoute CommonModule pour les pipes comme currency
  
    ),
  ],
};
