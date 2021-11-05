import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

  @Input() images: { id: number, image: string, active?: boolean }[] = [];
  @Input() defaultImage: string;

  get activeImage() {
    return this.images.find(img => img.active == true)?.image ?? this.defaultImage;
  }

  constructor() { }

  ngOnInit() {}

  changeActiveImage(id: any) {
    this.images.forEach(img => {
      img.active = false;
    });

    this.images.find(img => img.id == id).active = true;
  }
}
