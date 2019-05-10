import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Power } from '../power';
import { PowerService } from '../power.service';

@Component({
  selector: 'app-power-search',
  templateUrl: './power-search.component.html',
  styleUrls: [ './power-search.component.css' ]
})
export class PowerSearchComponent implements OnInit {
  powers$: Observable<Power[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: PowerService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.powers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchPowers(term)),
    );
  }
}