import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AdmissionsService } from '../../shared/admissions.service';
import { ScrollAnimationService } from '../../shared/scroll-animation.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit, AfterViewInit {
  public admissions = inject(AdmissionsService);
  private scrollAnim = inject(ScrollAnimationService);

  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.meta.addTags([
      { name: 'description', content: 'Contact Sree Narayana Group of Institutions. Admissions helpdesk: +91 8129036949. Email: admissionsreenarayana@gmail.com. Located in Bangalore — Yashavanthapura.' },
    ]);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.scrollAnim.refresh(), 100);
    }
  }
}
