import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Power } from '../power';
import { PowerService } from '../power.service';

@Component({
  selector: 'app-power-detail',
  templateUrl: './power-detail.component.html',
  styleUrls: [ './power-detail.component.css' ]
})
export class PowerDetailComponent implements OnInit {
  power: Power;

  constructor(
    private route: ActivatedRoute,
    private powerService: PowerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPower();
  }

  getPower(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.powerService.getPower(id)
      .subscribe(power => this.power = power);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.powerService.updatePower(this.power)
    .subscribe(() => this.goBack());
  }

}