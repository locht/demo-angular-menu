import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb'; // Import NzBreadCrumbModule
import { MenuService, MenuItem } from '../../services/menu.service';

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
    NzBreadCrumbModule // Add NzBreadCrumbModule here
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

  constructor(
    private menuService: MenuService,
    private router: Router,
    private activatedRoute: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenuItems();
    this.selectedPath = this.router.url;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.selectedPath = this.router.url;
        this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
        // Set page title from the last breadcrumb or a default value
        this.pageTitle = this.breadcrumbs.length > 0 ? this.breadcrumbs[this.breadcrumbs.length - 1].title : 'Dashboard';
      });

    // Initial breadcrumb build on load
    this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
    this.pageTitle = this.breadcrumbs.length > 0 ? this.breadcrumbs[this.breadcrumbs.length - 1].title : 'Dashboard';
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

    // Get title from data
    const routeTitle = route.snapshot.data['title'];

    // Add breadcrumb if title exists and it's not a duplicate based on title AND link
    // Also ensure we don't add breadcrumbs for wildcard routes or routes without a defined path unless it's the root with a title
    if (routeTitle && route.routeConfig && (route.routeConfig.path !== '**')) {
        // Add if it has a path, or if it's the root path ('') and has a title
        if (route.routeConfig.path !== '' || (route.routeConfig.path === '' && routeTitle)) {
            const newBreadcrumb: Breadcrumb = { title: routeTitle, link: currentUrl || '/' }; // Default link to '/' if somehow null
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