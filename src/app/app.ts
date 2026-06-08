import { Component, signal, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
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
  
  public isLoading = signal(false);

  ngOnInit() {
    // Initialize scroll animations globally (browser only)
    this.scrollAnim.init();

    // Setup router events for loader and scroll
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      } else if (
        event instanceof NavigationEnd || 
        event instanceof NavigationCancel || 
        event instanceof NavigationError
      ) {
        if (isPlatformBrowser(this.platformId) && event instanceof NavigationEnd) {
          // Scroll to top on route change
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        }
        
        // Hide loader after a tiny delay for smoothness
        setTimeout(() => {
          this.isLoading.set(false);
          // Re-observe new elements with delay for render
          setTimeout(() => this.scrollAnim.refresh(), 150);
        }, 500);
      }
    });
  }
}
