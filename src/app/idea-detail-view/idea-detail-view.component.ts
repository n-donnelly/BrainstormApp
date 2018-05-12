import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Idea } from '../model/idea';

@Component({
  selector: 'idea-detail-view',
  templateUrl: './idea-detail-view.component.html',
  styleUrls: ['./idea-detail-view.component.css']
})
export class IdeaDetailViewComponent implements OnInit, OnChanges {

  @Input() idea: Idea;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log("Changed: ", this.idea.title);
    console.log(this.idea);
  }
}
