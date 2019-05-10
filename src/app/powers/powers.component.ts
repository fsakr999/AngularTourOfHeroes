import { Component, OnInit } from '@angular/core';

import { Power } from '../power';
import { PowerService } from '../power.service';

@Component({
  selector: 'app-powers',
  templateUrl: './powers.component.html',
  styleUrls: ['./powers.component.css']
})
export class PowersComponent implements OnInit {

  powers: Power[];

  constructor(private powerService: PowerService) { }

  ngOnInit() {
    this.getPowers();
  }

  getPowers(): void {
    this.powerService.getPowers()
        .subscribe(powers => this.powers = powers);
  }
}
