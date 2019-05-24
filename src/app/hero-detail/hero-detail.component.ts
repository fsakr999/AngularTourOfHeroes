import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';

import { Hero } from '../hero';
import { Power } from '../power';
import { HeroService } from '../hero.service';
import { PowerService } from '../power.service';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Input() power: Power;
    powers: Power[];

    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        private powerService: PowerService,
        private location: Location
    ){}

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        const $getHero = this.heroService.getHero(id);
        const $getPowers = this.powerService.getPowers();

        forkJoin($getHero, $getPowers).subscribe((res: [Hero, Power[]]) => {
            this.hero = res[0];
            this.powers = res[1].filter(p => this.hero.powers.every(hp => hp.id !== p.id));
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }

    addHeroPower(power: Power): void {
        this.hero.powers.push(power);
        this.powers = this.powers.filter(p => p.id !== power.id);
    }
}
