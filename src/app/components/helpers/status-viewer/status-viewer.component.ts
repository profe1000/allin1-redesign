import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-status-viewer',
  templateUrl: './status-viewer.component.html',
  styleUrls: ['./status-viewer.component.scss'],
})
export class StatusViewerComponent implements OnInit {

  @Input() status;
  @Output() statusChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  changeStatus(e) {
    this.status = e?.detail.value;
    this.statusChange.emit(e)
  }

}
