import { Character } from './../shared/models/character';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';



import { environment } from 'src/environments/environment';
import { Movie } from '../shared/models/movie';
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

  getFilms(): Observable<Array<Movie>> {

    return this.http.get( environment.swapi + 'films')
    .pipe(map((data: any) => {
      
      const movies = [];

      data.results.forEach(element => {
        
        const movie = new Movie;
        movie.title = element.title;
        movie.episode_id = element.episode_id;
        movie.director = element.director;
        movie.producer = element.producer;
        movie.opening_crawl = element.opening_crawl;
        movie.release_date = element.release_date;
        movie.characters = this.setArrayId(element.characters);
        movie.species = this.setArrayId(element.species);
        movie.vehicles = this.setArrayId(element.vehicles);

        movies.push(movie);
      });
      
      return movies;
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
