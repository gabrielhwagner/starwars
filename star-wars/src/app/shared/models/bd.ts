import { Character } from './character';
import { Specie } from './specie';
import { Vehicle } from './vehicle';

export class Bd {


    characters: Array<Character>;
    species: Array<Specie>;
    vehicles: Array<Vehicle>;

    constructor() {
        this.characters = [];
        this.species = [];
        this.vehicles = [];
    }
}
