import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-viewer',
  templateUrl: './error-viewer.component.html',
  styleUrls: ['./error-viewer.component.scss'],
})
export class ErrorViewerComponent implements OnInit {

  @Input() errorTitle = "Something went wrong";
  @Input() errorText = "We're sorry. An error occured while performing this action. Please check your internet connection or try again later.";
  @Input() btnText = "OK, got it";
  @Output() btnClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  onBtnClick(e) {
    this.btnClick.emit(e);
  }

}
