export class Films {

    episode_id: number;
    title: string;
    opening_crawl: string;
    director: string;
    producer: string;

    release_date: string;

    vehicles: Array<string>;
    species:  Array<string>;
    starships:  Array<string>;
    planets:  Array<string>;
    characters:  Array<string>;

    constructor() {
        this.vehicles = [];
        this.species = [];
        this.starships = [];
        this.planets = [];
        this.characters = [];
    }
}
