import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { MenuService, MenuItem } from '../../services/menu.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { ThemeService } from '../../services/theme.service';
import { NotificationPopupComponent } from '../notification-popup/notification-popup.component';
import { LanguagePopupComponent } from '../language-popup/language-popup.component';
import { ProfilePopupComponent } from '../profile-popup/profile-popup.component';
import { TranslateModule } from '@ngx-translate/core';

interface Breadcrumb {
  title: string;
  link: string;
}

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzMenuModule,
    NzIconModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzInputModule,
    NzBadgeModule,
    NzPopoverModule,
    NotificationPopupComponent,
    LanguagePopupComponent,
    ProfilePopupComponent,
    TranslateModule
],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss'
})
export class SidebarMenuComponent implements OnInit {
  isCollapsed = false;
  menuItems: MenuItem[] = [];
  selectedPath: string = '';
  breadcrumbs: Breadcrumb[] = [];
  pageTitle: string = '';
  isDarkMode$: any

  constructor(
    private menuService: MenuService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService,
    private languageService: LanguageService
  ) {
    this.isDarkMode$ = this.themeService.isDarkMode$;
    // Thiết lập ngôn ngữ mặc định
    this.languageService.setLanguage('vi');
  }

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenuItems();
    this.selectedPath = this.router.url;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.selectedPath = this.router.url;
        this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
        // Set page title from the last breadcrumb or a default value
        // Use translate service to get the title if needed, or handle translation in the template
        const lastBreadcrumbTitle = this.breadcrumbs.length > 0 ? this.breadcrumbs[this.breadcrumbs.length - 1].title : 'Dashboard';
        this.pageTitle = this.languageService.getTranslation(lastBreadcrumbTitle);
      });

    // Initial breadcrumb build and title set on load
    this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
    const initialTitleKey = this.breadcrumbs.length > 0 ? this.breadcrumbs[this.breadcrumbs.length - 1].title : 'Dashboard';
    this.pageTitle = this.languageService.getTranslation(initialTitleKey);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // Helper function to build breadcrumbs recursively
  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;
    let currentBreadcrumbs = [...breadcrumbs]; // Use a local copy for this level

    // Get the route's configured path segment
    const routePath = route.routeConfig ? route.routeConfig.path : '';

    // Construct the URL for the current route level
    let currentUrl = url;
    if (routePath) {
        // Avoid double slash if parent url is '/'
        currentUrl = (url === '/') ? `/${routePath}` : `${url}/${routePath}`;
    }
    // Ensure the base URL is at least '/' if it started empty or is just the initial empty path
    if (!currentUrl && routePath === '') {
        currentUrl = '/';
    }

    // Get title from data (this should be the translation key)
    const routeTitleKey = route.snapshot.data['title'];

    // Add breadcrumb if title key exists and it's not a duplicate based on title key AND link
    // Also ensure we don't add breadcrumbs for wildcard routes or routes without a defined path unless it's the root with a title key
    if (routeTitleKey && route.routeConfig && (route.routeConfig.path !== '**')) {
        // Add if it has a path, or if it's the root path ('') and has a title key
        if (route.routeConfig.path !== '' || (route.routeConfig.path === '' && routeTitleKey)) {
            const newBreadcrumb: Breadcrumb = { title: routeTitleKey, link: currentUrl || '/' }; // Store the key in title
            if (!currentBreadcrumbs.some(b => b.link === newBreadcrumb.link && b.title === newBreadcrumb.title)) {
                currentBreadcrumbs.push(newBreadcrumb);
            }
        }
    }

    // Find the primary child route to continue recursion
    let primaryChild: ActivatedRoute | null = null;
    if (children && children.length > 0) {
        primaryChild = children.find(child => child.outlet === PRIMARY_OUTLET) || null;
    }

    // Recurse if a primary child exists
    if (primaryChild) {
        // Pass the *current* URL and the *accumulated* breadcrumbs
        return this.buildBreadcrumbs(primaryChild, currentUrl, currentBreadcrumbs);
    }

    // No more primary children, return the final list
    return currentBreadcrumbs;
  }
}