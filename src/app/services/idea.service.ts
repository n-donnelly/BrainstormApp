import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Idea } from '../model/idea';
import { SAMPLE_ROOT, IDEA_INDEX } from '../mock-nodes';

@Injectable()
export class IdeaService {

  constructor() { }

  getRoot() : Observable<Idea> {
    return of(SAMPLE_ROOT);
  }

  getIdeaIndex() : Observable<number> {
    return of(IDEA_INDEX)
  }

}
