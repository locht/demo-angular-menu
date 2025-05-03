import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-popup',
  standalone: true,
  imports: [
    CommonModule,
    NzPopoverModule,
    NzListModule,
    NzIconModule
  ],
  template: `
    <div class="language-list">
      <div class="language-item" 
           [class.selected]="currentLanguage === 'vi'"
           (click)="selectLanguage('vi')">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnamese" class="flag-icon" />
        <span>Tiếng Việt</span>
      </div>
      <div class="language-item"
           [class.selected]="currentLanguage === 'en'"
           (click)="selectLanguage('en')">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg" alt="English" class="flag-icon" />
        <span>English</span>
      </div>
    </div>
  `,
  styles: [`
    .language-list {
      min-width: 150px;
      padding: 8px 0;
    }

    .language-item {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f5f5f5;
      }

      &.selected {
        background-color: #e6f7ff;
        color: #1890ff;
      }

      .flag-icon {
        width: 20px;
        height: 15px;
        margin-right: 8px;
        object-fit: cover;
      }

      span {
        margin-right: 8px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  `]
})
export class LanguagePopupComponent {
  currentLanguage: string;

  constructor(private translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang;
    this.translate.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
    });
  }
//   constructor(private languageService: LanguageService) {
//     this.currentLanguage = this.languageService.getCurrentLanguage();
//     this.languageService.currentLanguage$.subscribe(
//       language => this.currentLanguage = language
//     );
//   }

  selectLanguage(language: string): void {
    this.translate.use(language);
  }
}