import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

@Component({
  selector: 'app-notification-popup',
  standalone: true,
  imports: [
    CommonModule,
    NzPopoverModule,
    NzListModule,
    NzIconModule
  ],
  template: `
    <nz-list [nzDataSource]="notifications" [nzRenderItem]="notificationTemplate" [nzItemLayout]="'horizontal'">
      <ng-template #notificationTemplate let-item>
        <nz-list-item [ngClass]="{'unread': !item.read}">
          <div class="notification-item">
            <h4>{{ item.title }}</h4>
            <p>{{ item.message }}</p>
            <span class="notification-time">{{ item.time | date:'short' }}</span>
          </div>
        </nz-list-item>
      </ng-template>
    </nz-list>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 300px;
    }

    .notification-item {
      padding: 8px;
      cursor: pointer;

      &:hover {
        background-color: #f0f2f5;
      }

      h4 {
        margin: 0;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
      }

      p {
        margin: 4px 0;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.65);
      }

      .notification-time {
        font-size: 11px;
        color: rgba(0, 0, 0, 0.45);
      }
    }

    .unread {
      background-color: #e6f7ff;
    }
  `]
})
export class NotificationPopupComponent {
  notifications: Notification[] = [
    {
      id: 1,
      title: 'Thông báo mới',
      message: 'Bạn có một thông báo mới từ hệ thống',
      time: new Date(),
      read: false
    },
    {
      id: 2,
      title: 'Cập nhật hệ thống',
      message: 'Hệ thống sẽ được cập nhật vào lúc 22:00',
      time: new Date(Date.now() - 3600000),
      read: true
    }
  ];
}