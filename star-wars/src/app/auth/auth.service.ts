import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  getFilms(grandCode: string, refresh: boolean): Observable<Film> {

    return this.http.get( environment.swapi + 'films')
    .pipe(map((data: any) => {
      debugger
      const films = [];

      data.results.array.forEach(element => {
        debugger
        const film = new Film;
        film.title = element.title;
        film.episode_id = element.episode_id;
        film.director = element.director;
        film.opening_crawl = element.opening_crawl;
        film.release_date = element.release_date;
        film.characters = this.setArrayId(element.characters, 'characters');
      });
      
      films.push({});


      return films;
    }));
  }

  setArrayId(data, camp) {
    const id = [];

    data[camp].array.forEach((element, index) => {
      id[index] = data[camp][index].match(/\d/g).join('');
    });

    return id;
  }


}
