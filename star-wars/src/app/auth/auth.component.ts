import { AppEventDispatcher } from './../shared/appEventDispacher';
import { Component, OnInit } from '@angular/core';
import { TimelineMax, Power4 } from 'gsap';

import { AuthService } from './auth.service';

import { Movie } from '../shared/models/movie';
import { EventTypes } from '../shared/eventTypes';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.styl']
})
export class AuthComponent implements OnInit {

  timeLine: TimelineMax;

  // Lista de filmes
  movies: Array<Movie>;

  // File que sera exibido no detalhe
  movieDetail: Movie;

  // exibicao dos blocos de filmes
  blockMovies: boolean;

  // exibicao dos bloco de detalhe do filme
  blockMovieDetail: boolean;

  // valor do componente para animação
  comp: string;

  constructor(private authService: AuthService) {
    this.blockMovieDetail = false;
    this.blockMovies = false;
    this.timeLine = new TimelineMax({paused: true});
    this.comp = '[data-component="movie-block"] ';
  }

  ngOnInit() {
    this.getFilms();
  }

  // Busca os dados de todos os filmes
  getFilms() {

    // Evento para abertura do preloader
    AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'show');

    this.authService.getFilms().subscribe((data: Array<Movie>) => {

        this.movies = data;

        // Evento para fechamento do preloader
        AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'hide');

        this.blockMovies = true;

        setTimeout(() => {
          // Funcao de inicialização da animação de abertura dos blocos
          this.showBlockMovies('movieBlock');
        }, 1000);

      }, error => {
        console.log(error);
      }
    );

  }


  /**
	 * Percorre o array de dados do film e verifica se ele ja está completo para a exibição
	 * @param id idenficador do filme
  */
  validateMovies(id) {

    // Percorre o array de filmes
    for (let index = 0; index < this.movies.length; index++) {

      // Valida se o filme é o mesmo que o usuario escolheu
      if (this.movies[index].episode_id === id) {

        // Valida se o filme ja não tem todos os dados necessarios
        if (this.movies[index].downloadComplete) {
          // passar filme para o bloco
          this.hideBlockMovies('movieBlock', this.movies[index]);

        } else {

          // Chama as funções que buscam os dados
          this.sourceBd('characters', this.movies[index]);
          this.sourceBd('vehicles', this.movies[index]);
          this.sourceBd('species', this.movies[index]);
        }
        break;
      }

    }
  }


  /**
	 * Percorre o array de dedos do filme
	 * @param type string que identifica o array de informação do filme
   * @param movie objeto de filme
  */
  sourceBd(type: string, movie: Movie) {

    movie[type].forEach((element, index) => {

      // Evento para abertura do preloader
      AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'show');
      this.getInfo(type, movie, index);
    });
  }


  /**
	 * Chama a funcão de get de dados do filme e seta para o filme
	 * @param type string que identifica o array de informação do filme
   * @param movie objeto de filme
   * @param index posição do array
  */
  getInfo(type, movie, index) {

    const t = movie[type].length;
    movie[`${type}Acount`] = movie[type].length;

    this.authService.getInfo(type, movie[type][index]).subscribe(data => {
      movie[type].push(data);
      this.validateDownload(movie, type);
    }, error => {
      console.log(error);
    });
  }


  /**
	 * Valida se o filme ja esta com todos os dados
	 * @param type string que identifica o array de informação do filme
   * @param movie objeto de filme
  */
  validateDownload(movie: Movie, type) {
    if (movie.vehiclesAcount ===  movie.vehicles.length / 2 &&
        movie.speciesAcount ===  movie.species.length / 2 &&
        movie.charactersAcount ===  movie.characters.length / 2) {

          // Evento para fechamento do preloader
          AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'hide');

          // limpa o array com os dados incompletos
          movie.vehicles.splice(0, movie.vehiclesAcount);
          movie.species.splice(0, movie.speciesAcount);
          movie.characters.splice(0, movie.charactersAcount);

          movie.downloadComplete = true;

          // Funçao para iniciar a animaçõa de saido dos blosox
          this.hideBlockMovies('movieBlock', movie);
    }
  }


  /**
	 * Animação de entrada dos blocos de filme e bloco de detalhe
	 * @param action string que identifica o bloco a ser exibido
  */
  showBlockMovies(action) {

    let heightBlock;

    if (action === 'movieBlock') {
      this.comp = '[data-component="movie-block"]';
      heightBlock = '450px';

    } else {
      this.comp = '[data-component="movie-block-detail"]';
      
      heightBlock = document.getElementById('height').offsetHeight;
    }

    // timeline do Tweenmax
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

    // Inicia a timeline
    this.timeLine.play();
  }


  /**
	 * Animação de saída dos blocos de filme e bloco de detalhe
	 * @param action string que identifica o bloco a ser exibido
  */
  hideBlockMovies(action, movie) {

    if (action === 'movieBlock') {
      this.comp = '[data-component="movie-block"] ';
    } else {
      this.comp = '[data-component="movie-block-detail"] ';
    }

     // timeline do Tweenmax
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

    // Inicia a timeline
    this.timeLine.play();

    if (action === 'movieBlock') {
      setTimeout(() => {

        // Funcao de controle das animações
        this.animationBlockMovieDetail('show', movie);
      }, 3000);
    }

  }


  /**
	 * Controle das trocas das animações
	 * @param action string que identifica o bloco a ser exibido
   * @param movie objeto de filme
  */
  animationBlockMovieDetail(action, movie) {

    if (action === 'hide') {

      this.hideBlockMovies('movieBlockDetail', null);

      setTimeout(() => {
        this.blockMovies = true;
        this.blockMovieDetail = false;

      }, 2000);
      setTimeout(() => {
        this.showBlockMovies('movieBlock');
      }, 2000);

    } else {

      this.blockMovies = false;
      this.blockMovieDetail = true;
      this.movieDetail = movie;
      setTimeout(() => {
        this.showBlockMovies('movieBlockDetail');
      }, 500);
    }
  }



}
