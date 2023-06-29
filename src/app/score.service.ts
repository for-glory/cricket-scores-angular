import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, Subject, from, BehaviorSubject } from 'rxjs';
import { catchError, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Score } from './score';
import { SourceType } from './source-type';
import { SCORES } from './mock-scores';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private scoresUrl = 'https://assessments.reliscore.com/api/cric-scores/';  // URL to web api

  private sourceType = new Subject<SourceType>();

  scores$ = new BehaviorSubject<Score[]>([]);

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.sourceType.pipe(
      distinctUntilChanged(),
      switchMap((sourceType: SourceType) => {
        switch (sourceType) {
          case SourceType.SERVER:
            return this.getScores();
        }
        return this.getTestData();
      }),
    ).subscribe(scores => {
      this.scores$.next(scores)
    });
  }

  private getScores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.scoresUrl)
      .pipe(
        tap(_ => this.log('fetched server scores')),
        catchError(this.handleError<Score[]>('getScores', []))
      );
  }

  private getTestData(): Observable<Score[]> {
    return from([ SCORES ])
      .pipe(
        tap(_ => this.log('fetched test scores')),
        catchError(this.handleError<Score[]>('getTestData', []))
      );
  }

  selectSourceType(sourceType: SourceType) {
    this.sourceType.next(sourceType);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ScoreService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ScoreService: ${message}`);
  }
}
