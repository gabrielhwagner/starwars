import { Character } from './character';
import { Specie } from './specie';
import { Vehicle } from './vehicle';

export class Movie {

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

    constructor() {
        this.downloadComplete = false;
        this.vehicles = [];
        this.species = [];
        this.characters = [];
    }
}
