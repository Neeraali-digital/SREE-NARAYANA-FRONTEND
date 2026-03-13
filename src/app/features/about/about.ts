import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'Learn about Sree Narayana Group of Institutions\'s history, vision, leadership, and our commitment to excellence in nursing education.' });
  }
}

