import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrls: ['./profile-viewer.component.scss'],
})
export class ProfileViewerComponent implements OnInit {

  @Input() imageUrl: string;
  @Input() name = "";
  @Input() shop = "";
  @Input() details: IDetails[] = [];
  @Input() actionBtns: IActionBtns[] = [];
  @Input() viewProfileUrl = "";

  @Output() onCall = new EventEmitter<any>();
  @Output() onViewProfile = new EventEmitter<any>();
  @Output() onChat = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  onCallClick(e: any) {
    this.onCall.emit(e);
  }

  onViewProfileClick(e: any) {
    this.onViewProfile.emit(e);
  }

  onChatClick(e: any) {
    this.onChat.emit(e);
  }

  preventDefault(e: any) {
    e.preventDefault();
  }

}

interface IDetails{
  value: string,
  key?: string,
  icon?: string,
  hasIcon?: boolean,
}

interface IActionBtns{
  icon: string,
  handler: () => { },
}