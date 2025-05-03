import { Injectable } from '@angular/core';

export interface MenuItem {
  title: string;
  icon?: string;
  link?: string;
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems: MenuItem[] = [
    {
      title: 'Trang chủ',
      icon: 'home',
      link: '/home'
    },
    {
      title: 'Quản lý',
      icon: 'appstore',
      children: [
        {
          title: 'Sản phẩm',
          link: '/management/products' // Updated link
        },
        {
          title: 'Đơn hàng',
          link: '/management/orders' // Updated link
        },
        {
          title: 'Khách hàng',
          link: '/management/customers' // Updated link
        },
        {
          title: 'Nhà cung cấp',
          link: '/management/suppliers' // Updated link
        }
      ]
    },
    {
      title: 'Báo cáo',
      icon: 'bar-chart',
      children: [
        {
          title: 'Báo cáo doanh thu',
          link: '/reports/revenue'
        },
        {
          title: 'Báo cáo tồn kho',
          link: '/reports/inventory'
        },
        {
          title: 'Báo cáo khách hàng',
          link: '/reports/customers'
        }
      ]
    },
    {
      title: 'Cài đặt',
      icon: 'setting',
      children: [
        {
          title: 'Thông tin cửa hàng',
          link: '/settings/store'
        },
        {
          title: 'Người dùng',
          link: '/settings/users'
        },
        {
          title: 'Phân quyền',
          link: '/settings/roles'
        }
      ]
    },
    {
      title: 'Trợ giúp',
      icon: 'question-circle',
      link: '/help'
    }
  ];

  constructor() {}

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }
}