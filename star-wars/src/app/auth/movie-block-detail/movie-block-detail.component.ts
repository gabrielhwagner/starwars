import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as Waves from 'node-waves';

import { Film } from 'src/app/shared/models/film';

@Component({
  selector: 'app-movie-block-detail',
  templateUrl: './movie-block-detail.component.html',
  styleUrls: ['./movie-block-detail.component.styl']
})
export class MovieBlockDetailComponent implements OnInit, AfterViewInit {

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

  // Ação para voltar para a lista de filmes
  backBlockFilms() {
    this.changeStep.emit('hide');
  }

}
