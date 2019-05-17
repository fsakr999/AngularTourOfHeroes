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
    styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Input() power: Power;
    powers: { id: number, name: string};

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
        this.heroService.getHero(id).subscribe(hero => this.hero = hero);
        this.powerService.getPowers().subscribe(allPowers => {
            this.powers = Object.assign({}, ...allPowers.map(power => {
                return { [power.id]: power.name }
            }))
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }

    addHeroPower(powerId: string): void {
        this.hero.powers.push(parseInt(powerId));
        this.save();
    }
}
