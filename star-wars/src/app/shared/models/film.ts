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

    vehicles: Array<Vehicle>;
    species:  Array<Specie>;
    starships:  Array<string>;
    planets:  Array<string>;
    characters:  Array<Character>;

    constructor() {
        this.downloadComplete = false;
        this.vehicles = [];
        this.species = [];
        this.starships = [];
        this.planets = [];
        this.characters = [];
    }
}
