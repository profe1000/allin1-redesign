import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss'],
})
export class FileSelectComponent implements OnInit {

  @Input() url: string = "";
  @Input() fileTitle: string = "";

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  goTo(e) {
    e.preventDefault();
  }

  navigate() {
    this.router.navigateByUrl(this.url);
  }
}
