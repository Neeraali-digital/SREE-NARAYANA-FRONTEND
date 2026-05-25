import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, inject } from '@angular/core';
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
export class Home implements OnInit, AfterViewInit {
  public admissions = inject(AdmissionsService);
  private scrollAnim = inject(ScrollAnimationService);

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
      }, 100);
    }
  }
}
