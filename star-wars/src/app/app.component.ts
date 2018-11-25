import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { trigger, transition, group, query, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'star-wars';

  constructor() { }

  ngOnInit() {

  }


}
