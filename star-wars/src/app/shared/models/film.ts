import { Character } from './character';
import { Specie } from './specie';
import { Vehicle } from './vehicle';

export class Film {

    episode_id: number;
    title: string;
    opening_crawl: string;
    director: string;
    producer: string;

    release_date: string;

    downloadComplete: boolean;

    vehiclesAcount: number;
    vehicles: Array<Vehicle>;

    speciesAcount: number;
    species:  Array<Specie>;

    charactersAcount: number;
    characters:  Array<Character>;
    
    starships:  Array<string>;
    planets:  Array<string>;
    constructor() {
        this.downloadComplete = false;
        this.vehicles = [];
        this.species = [];
        this.starships = [];
        this.planets = [];
        this.characters = [];
    }
}
