import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), data: { title: 'Trang chủ' } },
  {
    path: 'management', // Define the parent path for 'Quản lý'
    data: { title: 'Quản lý' }, // Add title for the parent route
    children: [
      { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), data: { title: 'Sản phẩm' } },
      { path: 'orders', loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent), data: { title: 'Đơn hàng' } },
      { path: 'customers', loadComponent: () => import('./pages/customers/customers.component').then(m => m.CustomersComponent), data: { title: 'Khách hàng' } },
      { path: 'suppliers', loadComponent: () => import('./pages/suppliers/suppliers.component').then(m => m.SuppliersComponent), data: { title: 'Nhà cung cấp' } },
    ]
  },
  { path: 'reports', data: { title: 'Báo cáo' }, children: [
    { path: 'revenue', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), data: { title: 'Doanh thu' } },
    { path: 'inventory', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), data: { title: 'Tồn kho' } },
    { path: 'customers', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), data: { title: 'Khách hàng' } },
  ]},
  { path: 'settings', data: { title: 'Cài đặt' }, children: [
    { path: 'store', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), data: { title: 'Cửa hàng' } },
    { path: 'users', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), data: { title: 'Người dùng' } },
    { path: 'roles', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), data: { title: 'Vai trò' } },
  ]},
  { path: 'help', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), data: { title: 'Trợ giúp' } },
  { path: '**', redirectTo: 'home' }
];
