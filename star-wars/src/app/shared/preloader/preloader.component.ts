import { Component, OnInit, Input } from '@angular/core';

import { TweenMax, TimelineMax, Power4, TimelineLite, Linear } from 'gsap';

import { AppEventDispatcher } from '../appEventDispacher';
import { EventTypes } from '../eventTypes';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.styl']
})
export class PreloaderComponent implements OnInit {

  comp: string;
  time: number;
  show: boolean;
  
  constructor() {
    this.comp = '[data-component="preloader"]';
    this.time = 0.4;
    this.show = false;
   }

  ngOnInit() {

    // Ouve o evento de preloader
    AppEventDispatcher.listen(EventTypes.PRELOADER, (event) => {


      if (event === 'show') {
        
        // Exibe o preloader
        this.show = true;
        TweenMax.set(this.comp,  {display: 'block'});
        TweenMax.to(this.comp,  this.time, {delay: 0.1, opacity: 1});

      } else if (event === 'hide') {

        // Esconde o preloader
        TweenMax.to(this.comp,  this.time, {opacity: 0, onComplete: () => {
          this.show = false;
          TweenMax.set(this.comp,  {display: 'none'});
        }});

      }

    });
  }

}
