import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTypographyModule],
  template: `
    <div class="home-container">
        <nz-card nzTitle="Trang chủ" [nzBordered]="false">
        <h2 nz-typography>Chào mừng đến với Menu Customer</h2>
        <p nz-typography>
            Đây là demo cho menu dạng collapse theo chiều dọc sử dụng Angular 19 và Ant Design.
        </p>
        </nz-card>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 0px;
    }
  `]
})
export class HomeComponent {}