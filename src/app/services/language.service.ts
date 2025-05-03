import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translate: TranslateService, private http: HttpClient) {}

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  public getTranslation(key: string): string {
    return this.translate.instant(key);
  }

//   getTranslation(lang: string): any {
//     return this.http.get(`/assets/i18n/${lang}.json`);
//   }
}