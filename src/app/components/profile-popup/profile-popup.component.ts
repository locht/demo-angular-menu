import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-profile-popup',
  standalone: true,
  imports: [
    CommonModule,
    NzPopoverModule,
    NzAvatarModule,
    NzIconModule,
    NzButtonModule,
    NzDividerModule
  ],
  template: `
    <div class="profile-popup">
      <div class="profile-header">
        <nz-avatar [nzSize]="64" nzIcon="user"></nz-avatar>
        <div class="profile-info">
          <h3>Hồ Thành Lộc</h3>
          <p>thanhloclhu&#64;gmail.com</p>
        </div>
      </div>
      <nz-divider></nz-divider>
      <div class="profile-actions">
        <button nz-button nzBlock (click)="viewProfile()">
          <span nz-icon nzType="user" nzTheme="outline"></span>
          Xem hồ sơ
        </button>
        <button nz-button nzBlock (click)="openSettings()">
          <span nz-icon nzType="setting" nzTheme="outline"></span>
          Cài đặt
        </button>
        <button nz-button nzBlock nzDanger (click)="logout()">
          <span nz-icon nzType="logout" nzTheme="outline"></span>
          Đăng xuất
        </button>
      </div>
    </div>
  `,
  styles: [`
    .profile-popup {
      min-width: 250px;
      padding: 16px;
    }

    .profile-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      .profile-info {
        margin-left: 16px;

        h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
        }

        p {
          margin: 4px 0 0;
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }

    .profile-actions {
      button {
        margin-bottom: 8px;
        text-align: left;

        &:last-child {
          margin-bottom: 0;
        }

        span[nz-icon] {
          margin-right: 8px;
        }
      }
    }
  `]
})
export class ProfilePopupComponent {
  viewProfile(): void {
    console.log('View profile clicked');
  }

  openSettings(): void {
    console.log('Settings clicked');
  }

  logout(): void {
    console.log('Logout clicked');
    // Implement logout logic here
  }
}