import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as Waves from 'node-waves';

import { TweenMax, TimelineMax, Power4, TimelineLite, Linear } from 'gsap';

import { Film } from './../../shared/models/film';

@Component({
  selector: 'app-movie-block',
  templateUrl: './movie-block.component.html',
  styleUrls: ['./movie-block.component.styl']
})
export class MovieBlockComponent implements OnInit, AfterViewInit {

  @Input() film: Film;
  @Output() changeStep = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Animação de click dos buttons
    console.log('foi');
    Waves.init();
    Waves.attach('.btn', ['waves-button', 'waves-light']);

	}


  maisDetalhes(id) {
    
    this.changeStep.emit(id);
  }

}
