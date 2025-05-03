import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzResultModule],
  template: `
    <nz-result nzStatus="404" nzTitle="404" nzSubTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại.">
      <div nz-result-extra>
        <button nz-button nzType="primary" (click)="goHome()">Về trang chủ</button>
      </div>
    </nz-result>
  `
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/home']);
  }
}