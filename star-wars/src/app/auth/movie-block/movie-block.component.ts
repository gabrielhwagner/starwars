import { Component, OnInit, Input } from '@angular/core';

import { Film } from './../../shared/models/film';

@Component({
  selector: 'app-movie-block',
  templateUrl: './movie-block.component.html',
  styleUrls: ['./movie-block.component.styl']
})
export class MovieBlockComponent implements OnInit {

  @Input() film: Film;

  constructor() { }

  ngOnInit() {
  }

}
