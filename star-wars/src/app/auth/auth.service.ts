import { Character } from './../shared/models/character';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';



import { environment } from 'src/environments/environment';
import { Film } from '../shared/models/film';
import { Vehicle } from '../shared/models/vehicle';
import { Specie } from '../shared/models/specie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  getInfo(type, id): Observable<any> {

    switch (type) {
      case 'characters':
        return this.getPeople(id);
      case 'vehicles':
        return this.getVehicle(id);
      case 'species':
        return this.getSpecie(id);
      default:
        break;
    }
  }

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

  getPeople(id): Observable<Character> {

    return this.http.get( environment.swapi + 'people/' + id)
    .pipe(map((data: any) => {
      

      const people = new Character;
      people.id = id;

      people.name = data.name;
      people.eye_color = data.eye_color;
      people.gender = data.gender;
      people.mass = data.mass;


      return people;
    }));
  }

  getVehicle(id): Observable<Vehicle> {

    return this.http.get( environment.swapi + 'vehicles/' + id)
    .pipe(map((data: any) => {

      
      const vehicle = new Vehicle;

      vehicle.id = id;
      vehicle.model = data.model;
      vehicle.manufacturer = data.manufacturer;
      vehicle.name = data.name;
      vehicle.passengers = data.passengers;

      return vehicle;
    }));
  }

  getSpecie(id): Observable<Specie> {
    
    return this.http.get( environment.swapi + 'species/' + id)
    .pipe(map((data: any) => {
      

      const specie = new Specie;

      specie.id = id;
      specie.classification = data.classification;
      specie.designation = data.designation;
      specie.language = data.language;
      specie.name = data.name;


      return specie;
    }));
  }

  setArrayId(data) {
    let id = [];
    id = data.map((pos) => {
      return pos.match(/\d/g).join('');
    });

    return id;
  }


}
