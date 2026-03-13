import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit {
  
  @ViewChild('heroTitle') heroTitle!: ElementRef;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef;
  @ViewChild('statsSection') statsSection!: ElementRef;

  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'Sree Narayana Group of Institutions offers top-tier BSN, MSN, and accelerated nursing programs for aspiring healthcare professionals.' });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Hero Animations
      gsap.from(this.heroTitle.nativeElement.children, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.2
      });

      gsap.from(this.heroSubtitle.nativeElement, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
      });

      // Stats ScrollTrigger
      const statItems = this.statsSection.nativeElement.querySelectorAll('.stat-item');
      gsap.from(statItems, {
        scrollTrigger: {
          trigger: this.statsSection.nativeElement,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.5)'
      });

      // Parallax effect on images
      const parallaxImages = document.querySelectorAll('.parallax-img');
      parallaxImages.forEach(img => {
        gsap.to(img, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    }
  }
}
