import { Component, OnInit, AfterViewInit, signal, inject, Inject, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AdmissionsService } from '../../shared/admissions.service';
import { ScrollAnimationService } from '../../shared/scroll-animation.service';

@Component({
  selector: 'app-programs',
  imports: [CommonModule],
  templateUrl: './programs.html',
  styleUrl: './programs.css',
})
export class Programs implements OnInit, AfterViewInit {
  public admissions = inject(AdmissionsService);
  private scrollAnim = inject(ScrollAnimationService);

  selectedTab = signal<'all' | 'nursing' | 'allied'>('all');
  expandedCourse = signal<string | null>(null);

  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.meta.addTags([
      { name: 'description', content: 'Browse BSc Nursing, GNM, MSc Nursing, BPT, Allied Health Science programs at Sree Narayana Group of Institutions, Bangalore. RGUHS affiliated, INC recognized.' },
    ]);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.scrollAnim.refresh(), 100);
    }
  }

  setTab(tab: 'all' | 'nursing' | 'allied') {
    this.selectedTab.set(tab);
    this.expandedCourse.set(null);
    // Re-observe after DOM update
    setTimeout(() => this.scrollAnim.refresh(), 50);
  }

  toggleCourseDetails(courseId: string) {
    if (this.expandedCourse() === courseId) {
      this.expandedCourse.set(null);
    } else {
      this.expandedCourse.set(courseId);
    }
  }
}
