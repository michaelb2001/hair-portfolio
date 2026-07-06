import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {

  images: string[] = [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f',
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e',
    'https://images.unsplash.com/photo-1487412912498-0447578fcca8',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388'
  ];

  selectedIndex: number = -1;

  open(index: number) {
    this.selectedIndex = index;
  }

  close() {
    this.selectedIndex = -1;
  }

 next(event: Event) {
  event.stopPropagation();

  this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
}

prev(event: Event) {
  event.stopPropagation();

  this.selectedIndex =
    (this.selectedIndex - 1 + this.images.length) % this.images.length;
}
}