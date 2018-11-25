import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';



import { environment } from 'src/environments/environment';
import { Film } from '../shared/models/film';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  getFilms(): Observable<Array<Film>> {

    return this.http.get( environment.swapi + 'films')
    .pipe(map((data: any) => {
      
      const films = [];

      data.results.forEach(element => {
        
        const film = new Film;
        film.title = element.title;
        film.episode_id = element.episode_id;
        film.director = element.director;
        film.producer = element.producer;
        film.opening_crawl = element.opening_crawl;
        film.release_date = element.release_date;
        film.characters = this.setArrayId(element.characters);
        film.planets = this.setArrayId(element.planets);
        film.species = this.setArrayId(element.species);
        film.starships = this.setArrayId(element.starships);
        film.vehicles = this.setArrayId(element.vehicles);

        films.push(film);
      });
      
      return films;
    }));
  }

  setArrayId(data) {
    const id = [];

    data.forEach((element, index) => {
      id[index] = element.match(/\d/g).join('');
    });

    return id;
  }


}
