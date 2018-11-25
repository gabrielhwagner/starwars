import { Character } from './../shared/models/character';
import { Component, OnInit, HostListener } from '@angular/core';
import { TweenMax, TimelineMax, Power4, TimelineLite, Linear } from 'gsap';

import { AuthService } from './auth.service';

import { Film } from '../shared/models/film';
import { Specie } from '../shared/models/specie';
import { Vehicle } from '../shared/models/vehicle';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.styl']
})
export class AuthComponent implements OnInit {

  timeLine: TimelineMax;

  films: Array<Film>;

  peoples: Array<Character>;
  species: Array<Specie>;
  vehicles: Array<Vehicle>;

  comp: string;

  constructor(private authService: AuthService) {

    this.timeLine = new TimelineMax({paused: true});
    this.comp = '[data-component="movie-block"] ';
  }

 
  ngOnInit() {
    this.scrollHandler();
    this.getFilms();
  }

  // Busca os dados de todos os filmes
  getFilms() {

    this.authService.getFilms().subscribe((data: Array<Film>) => {
        this.films = data;

        setTimeout(() => {

          this.showBlockFilms();

        }, 1000);


      }, error => {
        console.log(error);
      }
    );

  }

  // Ouve o scroll, valida a posição da tela para inicias a animação dos blocos de filmes
  @HostListener('window:scroll')
  scrollHandler() {
    // window.scrollY;.
    if (document.getElementsByClassName('container')[0] !== undefined) {
      // console.log(document.getElementsByClassName('col-md-12').getBoundingClientRect().top);
    }
  }


  id(id) {

    for (let index = 0; index < this.films.length; index++) {
      if (this.films[index].episode_id === id) {
        if (this.films[index].downloadComplete) {
          // hide e show no bloco de detalhe do filme
        } else {
        // faz consulta nos dados para ver se ja tem, e busca os que faltam
        }
      }

    }
  }

  // Animação de entrada dos blocos de filme
  showBlockFilms() {

    this.timeLine
    .staggerTo(`${this.comp}`,
      1.2,
    { left: 0, ease: Power4.easeInOut }, 0.1
    )
    .to(`${this.comp} .border`,
      1.2,
    { height: '420px', ease: Power4.easeInOut }, 1.3
    )
    .to(`
			${this.comp} .content-button`,
      1.4,
    { opacity: 1, ease: Power4.easeOut }
    );

    this.timeLine.play();
  }

  // Animação de saída dos blocos de filme
  hideBlockFilms() {

    this.timeLine
    .to(`
			${this.comp} .content-button`,
      1.4,
    { opacity: 0, ease: Power4.easeOut }
    )
    .to(`${this.comp} .border`,
      1.2,
    { height: '42px', ease: Power4.easeInOut }, 1.3
    )
    .staggerTo(`${this.comp}`,
      1.2,
    { left: '280%', ease: Power4.easeInOut }, 0.1
    );

    this.timeLine.play();
  }



}
