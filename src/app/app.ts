import { Component, signal, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AdmissionsService } from './shared/admissions.service';
import { ScrollAnimationService } from './shared/scroll-animation.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('nursing-college');
  public admissions = inject(AdmissionsService);
  private scrollAnim = inject(ScrollAnimationService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    // Initialize scroll animations globally (browser only)
    this.scrollAnim.init();

    // Re-init on every navigation end (page change)
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (isPlatformBrowser(this.platformId)) {
          // Scroll to top on route change
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        }
        // Re-observe new elements with delay for render
        setTimeout(() => this.scrollAnim.refresh(), 150);
      });
  }
}
