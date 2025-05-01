import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
  { path: 'orders', loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent) },
  { path: 'customers', loadComponent: () => import('./pages/customers/customers.component').then(m => m.CustomersComponent) },
  { path: 'suppliers', loadComponent: () => import('./pages/suppliers/suppliers.component').then(m => m.SuppliersComponent) },
  { path: 'reports/revenue', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
  { path: 'reports/inventory', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
  { path: 'reports/customers', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
  { path: 'settings/store', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
  { path: 'settings/users', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
  { path: 'settings/roles', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
  { path: 'help', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
  { path: '**', redirectTo: 'home' }
];
