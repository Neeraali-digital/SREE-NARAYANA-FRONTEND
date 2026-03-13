import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'Contact Sree Narayana Group of Institutions admissions office for inquiries about our nursing programs, scholarships, and campus tours.' });
  }
}

