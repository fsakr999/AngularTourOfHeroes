import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { Power } from '../power';
import { HeroService } from '../hero.service';

import { PowerService } from '../power.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Input() power: Power;
  heroPowerBlank = true;

  powers: Power[];
  powerTmp: Power;
  powerSelected: string;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private powerService: PowerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();

    this.powerService.getPowers()
        .subscribe(powers => this.powers = powers);

//    this.powers = [] as any;
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }



  getPowerName(powerId): string {
    this.powerTmp = this.powers.find(power => power.id === powerId);
    return this.powerTmp.name;
  }

  addHeroPower(): void {
/*
    console.log('powerName=' + MorePowers);
/*
    if (!powerName)
    {
      return;
    }
*/
  }


  powerSelectChange(event): void {
    this.powerSelected = event.target.value;
    this.heroPowerBlank = (this.powerSelected === '0');
  }



/*

  powerSelectChange(powerName) {
    if (powerName === '') {
      return true;
    }
    else {
      return false;
    }
//    this.addHeroPowerButton.visible = (powerName === '');
  }

*/


    /*
    this.heroService.addHero({ power } as Power)
      .subscribe(hero => {
        this.hero.hasPowers.push(this.power.id);
      });
      */
  }


/*
add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

*/



  /*
  addPower(powerName: string): void {
    powerName = powerName.trim();
    if (!powerName) 
    {
       return; 
    }
    this.heroService.addHeroPower({ powerName } as Power)
      .subscribe(power => {
        this.powers.push(power);
      });
  }  
*/  
