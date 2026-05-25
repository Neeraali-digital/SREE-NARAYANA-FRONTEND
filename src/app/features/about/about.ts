import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AdmissionsService } from '../../shared/admissions.service';
import { ScrollAnimationService } from '../../shared/scroll-animation.service';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit, AfterViewInit {
  public admissions = inject(AdmissionsService);
  private scrollAnim = inject(ScrollAnimationService);

  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.meta.addTags([
      { name: 'description', content: 'Learn about Sree Narayana Group of Institutions — our history, values, leadership, campus facilities, and commitment to compassionate healthcare education.' },
      { property: 'og:title', content: 'About Sree Narayana Group of Institutions | Nursing College Bangalore' },
    ]);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.scrollAnim.refresh(), 100);
    }
  }
}
