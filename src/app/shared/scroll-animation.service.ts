import { Injectable, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Once visible, stop observing to avoid re-triggering
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.12,
      }
    );

    this.observeAll();
  }

  observeAll(): void {
    if (!isPlatformBrowser(this.platformId) || !this.observer) return;

    const elements = document.querySelectorAll('[data-animate], [data-animate-stagger]');
    elements.forEach((el) => {
      this.observer!.observe(el);
    });
  }

  /** Call after route change to pick up new elements */
  refresh(): void {
    this.observeAll();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
