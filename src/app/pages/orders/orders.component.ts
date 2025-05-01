import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTypographyModule],
  template: `
    <div class="container">
      <nz-card>
        <h2 nz-typography>Quản lý đơn hàng</h2>
        <p nz-typography>Nội dung trang đơn hàng sẽ được hiển thị ở đây</p>
      </nz-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
    }
  `]
})
export class OrdersComponent {}