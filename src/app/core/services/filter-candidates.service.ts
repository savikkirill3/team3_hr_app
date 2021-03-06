import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CandidatesStore } from './candidate-store.service';

@Injectable()
export class FilterCandidatesService {
  isToolbarShown = false;
  filterText$ = new BehaviorSubject<string>('');

  get curFilterText() {
    return this.filterText$.getValue();
  }

  constructor(private candidateStore: CandidatesStore) {
    this.candidateStore.filterCandidates(this.filterText$);
  }

  callAllbehaviorSubjects() {
    this.filterText$.next(this.filterText$.getValue());
  }
}
