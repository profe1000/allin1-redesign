import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-category-card',
  templateUrl: './home-category-card.component.html',
  styleUrls: ['./home-category-card.component.scss'],
})
export class HomeCategoryCardComponent implements OnInit {

  @Input() cardTitle = "";
  @Input() cardImage: string;
  @Input() cardUrl: string = "";

  constructor() { }

  ngOnInit() {}

}
