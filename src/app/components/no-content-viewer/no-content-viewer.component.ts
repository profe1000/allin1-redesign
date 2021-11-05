import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-content-viewer',
  templateUrl: './no-content-viewer.component.html',
  styleUrls: ['./no-content-viewer.component.scss'],
})
export class NoContentViewerComponent implements OnInit {

  @Input() imgSrc = "./assets/images/noitem.png";
  @Input() text = "No items";

  constructor() { }

  ngOnInit() {}

}
