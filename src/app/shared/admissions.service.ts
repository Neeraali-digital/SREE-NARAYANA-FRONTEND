import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdmissionsService {
  isModalOpen = signal(false);

  openModal() {
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen.set(false);
    document.body.style.overflow = 'auto';
  }
}
