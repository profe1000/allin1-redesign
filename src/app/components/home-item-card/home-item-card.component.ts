import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-item-card',
  templateUrl: './home-item-card.component.html',
  styleUrls: ['./home-item-card.component.scss'],
})
export class HomeItemCardComponent implements OnInit {

  @Input() cardUrl = "";
  @Input() itemImage: string;
  @Input() itemTitle: string = "";
  @Input() itemPrice: string = "";
  @Input() shopCategory: string = "";
  @Input() itemLocation: string = "";
  @Input() cardType: "goods" | "shop" | "" = "goods";

  constructor() { }

  ngOnInit() {}

}