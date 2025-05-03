import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, HttpClient, withFetch } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LanguageService } from './services/language.service';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';

registerLocaleData(en);

// Required for AOT compilation


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNzI18n(en_US),
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      TranslateModule.forRoot(),
      NzLayoutModule,
      NzMenuModule,
      NzIconModule,
      NzBreadCrumbModule,
      NzInputModule,
      NzBadgeModule,
      NzPopoverModule
    ),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    LanguageService,
    TranslatePipe,
    {
      provide: NZ_ICONS,
      useValue: [UserOutline, LockOutline] as IconDefinition[]
    }
  ]
};
