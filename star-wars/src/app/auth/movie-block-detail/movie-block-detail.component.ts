import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import * as Waves from 'node-waves';

import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-movie-block-detail',
  templateUrl: './movie-block-detail.component.html',
  styleUrls: ['./movie-block-detail.component.styl']
})
export class MovieBlockDetailComponent implements OnInit, AfterViewInit {

 
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

  
	// OutPut para iniciar a ação de voltar para a lista de filmes
  backBlockMovies() {
    this.changeStep.emit('hide');
  }

}
