import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { ProjectComponent } from "./components/project/project.component";
import { AddProjectComponent } from "./components/project/add-project/add-project.component";
import { ShowProjectComponent } from "./components/project/show-project/show-project.component";
import { EditProjectComponent } from "./components/project/edit-project/edit-project.component";
import { ProductComponent } from './components/product/product.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { PanierComponent } from './components/panier/panier.component'; // Importez le composant Panier

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      // Redirection par défaut
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },

      // Dashboard
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },

      // Section Projects
      {
        path: 'projects',
        children: [
          { path: '', component: ProjectComponent }, // Liste des projets
          { path: 'new', component: AddProjectComponent }, // Créer un nouveau
          { path: ':id', component: ShowProjectComponent }, // Voir les détails
          { path: 'edit/:id', component: EditProjectComponent } // Modifier un projet
        ]
      },

      // Section Products
      {
        path: 'Products',
        children: [
          { path: '', component: ProductComponent }, // Liste des produits
        ]
      },

      // Section Supplier
      {
        path: 'Supplier',
        children: [
          { path: '', component: SupplierComponent }, // Liste des fournisseurs
        ]
      },

      // Section Panier
      {
        path: 'panier',
        component: PanierComponent, // Ajoutez cette route pour accéder au panier
      },

      // UI Components
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },

      // Pages supplémentaires
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },

  // Layout pour l'authentification (Blank)
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },

  // Route de secours (Wildcard Route)
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
