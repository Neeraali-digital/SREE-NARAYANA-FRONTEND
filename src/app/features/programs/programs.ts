import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-programs',
  imports: [],
  templateUrl: './programs.html',
  styleUrl: './programs.css',
})
export class Programs implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'Explore our comprehensive nursing programs including traditional BSN, MSN with specializations, and Accelerated BSN tracks.' });
  }
}

