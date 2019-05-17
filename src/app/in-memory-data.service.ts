import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Power } from './power';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Superman', powers: [11, 12, 13, 14, 15, 16]},
      { id: 12, name: 'Spiderman', powers: [12, 15, 17, 18, 19]},
      { id: 13, name: 'Black Panther', powers: [12, 15, 17, 18, 19, 21]},
      { id: 14, name: 'Captain Marvel', powers: [11, 12, 18, 20, 21]},
      { id: 15, name: 'The Shadow', powers: [22, 23]},
      { id: 16, name: 'Professor X', powers: [22, 25]},
      { id: 17, name: 'Rubberman', powers: [24, 26]},
      { id: 17, name: 'Dynamo', powers: [11, 12, 13, 25, 27]},
      { id: 18, name: 'Red Tornado', powers: [11, 12, 27]}

//      { id: 19, name: '', powers: []},
//      { id: 21, name: '', powers: []}
    ];

    const powers = [
      { id: 11, name: 'Flying' },
      { id: 12, name: 'Super Strength' },
      { id: 13, name: 'X-Ray Vision' },
      { id: 14, name: 'Cold Breath' },
      { id: 15, name: 'Super Speed' },
      { id: 16, name: 'Heat Vision' },
      { id: 17, name: 'Agility' },
      { id: 18, name: 'Reflexes' },
      { id: 19, name: 'Healing' },
      { id: 20, name: 'Invulnerability' },
      { id: 21, name: 'Super Sense' },
      { id: 22, name: 'Hypnosis' },
      { id: 23, name: 'Invisibility' },
      { id: 24, name: 'Power Absorbtion' },
      { id: 25, name: 'Telepathy' },
      { id: 26, name: 'Elasticity' },
      { id: 27, name: 'Shape Shifting' },
      { id: 27, name: 'Creating Storms' }
    ];

    return {heroes, powers};
  }


  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.

  genId<T extends Hero | Power>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}








