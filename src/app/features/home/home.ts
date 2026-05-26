import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AdmissionsService } from '../../shared/admissions.service';
import { ScrollAnimationService } from '../../shared/scroll-animation.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  public admissions = inject(AdmissionsService);
  private scrollAnim = inject(ScrollAnimationService);
  private cdr = inject(ChangeDetectorRef);

  public slides = [
    {
      image: 'campus_hero.png',
      alt: 'Sree Narayana Campus',
      badgeTitle: 'INC Recognized',
      badgeSub: 'Nursing · Allied Health · BPT'
    },
    {
      image: 'campus_facility_lab_1773404343142.png',
      alt: 'Clinical Simulation Lab',
      badgeTitle: 'Advanced Labs',
      badgeSub: 'Simulation & Practical Training'
    },
    {
      image: 'campus_facility_library_1773404359783.png',
      alt: 'Central & Digital Library',
      badgeTitle: 'Modern Library',
      badgeSub: '10,000+ Books & E-Resources'
    }
  ];
  public currentSlide = 0;
  private slideInterval: any;

  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.meta.addTags([
      { name: 'description', content: 'Sree Narayana Group of Institutions — Premier nursing and allied health science college in Bangalore. INC recognized. Admissions open 2026-27.' },
      { property: 'og:title', content: 'Sree Narayana Group of Institutions | Nursing & Allied Health Sciences' },
      { name: 'keywords', content: 'nursing college Bangalore, BSc nursing, GNM, BPT, allied health sciences, RGUHS, INC recognized' },
    ]);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Small delay to let Angular render DOM
      setTimeout(() => {
        this.scrollAnim.init();
        // Start slider only in browser after DOM is ready
        this.startSlider();
      }, 100);
    }
  }

  startSlider() {
    if (isPlatformBrowser(this.platformId)) {
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 3000);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.cdr.detectChanges();
  }

  setSlide(index: number) {
    this.currentSlide = index;
    this.cdr.detectChanges();
    // Reset timer on manual navigation to prevent immediate transitions
    if (isPlatformBrowser(this.platformId)) {
      clearInterval(this.slideInterval);
      this.startSlider();
    }
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}
