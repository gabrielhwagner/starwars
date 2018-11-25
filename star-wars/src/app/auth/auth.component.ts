import { AppEventDispatcher } from './../shared/appEventDispacher';
import { Character } from './../shared/models/character';
import { Component, OnInit, HostListener } from '@angular/core';
import { TweenMax, TimelineMax, Power4, TimelineLite, Linear } from 'gsap';

import { AuthService } from './auth.service';

import { Film } from '../shared/models/film';
import { Bd } from '../shared/models/bd';
import { EventTypes } from '../shared/eventTypes';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.styl']
})
export class AuthComponent implements OnInit {

  timeLine: TimelineMax;

  films: Array<Film>;
  filmDetail: Film;

  bd: Bd;

  blockfilms: boolean;
  blockfilmDetail: boolean;

  comp: string;

  constructor(private authService: AuthService) {
    this.bd = new Bd;
    this.blockfilmDetail = false;
    this.blockfilms = false;
    this.timeLine = new TimelineMax({paused: true});
    this.comp = '[data-component="movie-block"] ';
  }

  ngOnInit() {
    this.scrollHandler();
    this.getFilms();
  }

  // Busca os dados de todos os filmes
  getFilms() {

    AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'show');

    this.authService.getFilms().subscribe((data: Array<Film>) => {

        this.films = data;
        AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'hide');
        this.blockfilms = true;
        setTimeout(() => {
          this.showBlockFilms('movieBlock');
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
    debugger
    for (let index = 0; index < this.films.length; index++) {
      if (this.films[index].episode_id === id) {
        if (this.films[index].downloadComplete) {
          // passar filme para o bloco
          this.hideBlockFilms('movieBlock', this.films[index]);
          // exibir bloco de detalhe
        } else {

          // faz consulta nos dados para ver se ja tem, e busca os que faltam
          
          this.sourceBd('characters', this.films[index]);
          this.sourceBd('vehicles', this.films[index]);
          this.sourceBd('species', this.films[index]);
        }
        break;
      }

    }
  }

  sourceBd(type: string, film: Film) {


    if (this.bd[type].length === 0 ) {

      film[type].forEach((element, index) => {

        
        AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'show');
        this.getInfo(type, film, index);
      });

    } else {

      for (let countFilm = 0; countFilm < film[type].length; countFilm++) {

        for (let index = 0; index < this.bd[type].length; index++) {
          if (this.bd[type][index].id === film[type][countFilm]) {
            film[type].push(this.bd[type][index]);

            break;
          } else {
            // Não tem o dado no array local
            if (index + 1 === this.bd[type].length) {
              this.getInfo(type, film, countFilm);
            }
            break;
          }
        }

      }
    }
  }

  getInfo(type, film, index) {

    const t = film[type].length;
    film[`${type}Acount`] = film[type].length;

    this.authService.getInfo(type, film[type][index]).subscribe(data => {


      this.bd[type].push(data);
      film[type].push(data);


      this.validateDownload(film, type);
    }, error => {
      console.log(error);
    });
  }
  validateDownload(film: Film, type) {
    if (film.vehiclesAcount ===  film.vehicles.length / 2 &&
        film.speciesAcount ===  film.species.length / 2 &&
        film.charactersAcount ===  film.characters.length / 2) {
          AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'hide');
          // exibe bloco
          debugger
          film.vehicles.splice(0, film.vehiclesAcount);
          film.species.splice(0, film.speciesAcount);
          film.characters.splice(0, film.charactersAcount);
          film.downloadComplete = true;

          this.hideBlockFilms('movieBlock', film);

    }

  }

  // Animação de entrada dos blocos de filme
  showBlockFilms(action) {

    let heightBlock;

    if (action === 'movieBlock') {
      this.comp = '[data-component="movie-block"]';
      heightBlock = '430px';

    } else {
      this.comp = '[data-component="movie-block-detail"]';
      heightBlock = 'auto';
    }

    this.timeLine
    .staggerTo(`${this.comp}`,
      1.2,
    { left: 0, ease: Power4.easeInOut }, 0.1
    )
    .to(`${this.comp} .border`,
      1.2,
    { height: heightBlock, ease: Power4.easeInOut }, 1.3
    )
    .to(`
			${this.comp} .content-button`,
      1.4,
    { opacity: 1, ease: Power4.easeOut }
    );

    this.timeLine.play();
  }

  // Animação de saída dos blocos de filme
  hideBlockFilms(action, film) {

    if (action === 'movieBlock') {
      this.comp = '[data-component="movie-block"] ';
    } else {
      this.comp = '[data-component="movie-block-detail"] ';
    }

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

    if (action === 'movieBlock') {
      setTimeout(() => {
        this.animationBlockFilmDetail('show', film);
      }, 3000);
    }

  }

  // Animação de entrada e saida do bloco de detalhe do filme
  animationBlockFilmDetail(action, film) {

    if (action === 'hide') {

      this.hideBlockFilms('movieBlockDetail', null);

      setTimeout(() => {
        this.blockfilms = true;
        this.blockfilmDetail = false;
       
      }, 2000);
      setTimeout(() => {
        this.showBlockFilms('movieBlock');
      }, 2000);

    } else {

      this.blockfilms = false;
      this.blockfilmDetail = true;
      this.filmDetail = film;
      setTimeout(() => {
        this.showBlockFilms('movieBlockDetail');
      }, 500);
    }
  }



}
