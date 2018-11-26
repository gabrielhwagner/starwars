import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, HostListener } from '@angular/core';
import * as Waves from 'node-waves';

import { TweenMax, TimelineMax, Power4, TimelineLite, Linear } from 'gsap';

import { Movie } from './../../shared/models/movie';

@Component({
  selector: 'app-movie-block',
  templateUrl: './movie-block.component.html',
  styleUrls: ['./movie-block.component.styl']
})
export class MovieBlockComponent implements OnInit, AfterViewInit {

  // Objeto de filme para exibir
  @Input() movie: Movie;

  @Output() changeStep = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }


  ngAfterViewInit() {
    // Animação de click dos buttons
   
    Waves.init();
    Waves.attach('.btn', ['waves-button', 'waves-light']);

  }

  /**
	 * OutPut para iniciar a ação de abrir o bloco de detalhe
	 * @param id identificador do bloco do filme
	*/
  moreDetails(id) {
  
    this.changeStep.emit(id);
  }

}
