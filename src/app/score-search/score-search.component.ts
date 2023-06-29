import { Component } from '@angular/core';

import { Subject, Observable, tap } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, combineLatestWith, map, reduce
} from 'rxjs/operators';

import { ScoreService } from '../score.service';
import { Score } from '../score';

@Component({
  selector: 'app-score-search',
  templateUrl: './score-search.component.html',
  styleUrls: ['./score-search.component.css']
})
export class ScoreSearchComponent {
  constructor(private scoreService: ScoreService) {}

  private searchTerms = new Subject<string>();
  score$!: Observable<number | undefined>;

  search(term: string): void {
    this.searchTerms.next(term.trim());
  }

  ngOnInit(): void {
    this.score$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      combineLatestWith(this.scoreService.scores$),
      map(([term, scores]) => scores.filter(score => term.localeCompare(score[0], undefined, { sensitivity: 'accent' }) === 0)),
      map((scores) => scores.map(score => score[1])),
      map((scores) => scores.length === 0 ? undefined : (scores.reduce((acc, val) => acc + val) / scores.length))
    );
  }
}
