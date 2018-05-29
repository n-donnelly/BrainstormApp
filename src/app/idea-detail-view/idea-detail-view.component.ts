import { Component, EventEmitter, OnInit, Input, OnChanges, Output } from '@angular/core';
import { Idea } from '../model/idea';

@Component({
  selector: 'idea-detail-view',
  templateUrl: './idea-detail-view.component.html',
  styleUrls: ['./idea-detail-view.component.css']
})
export class IdeaDetailViewComponent implements OnInit, OnChanges {

  @Input() idea: Idea;
  @Output() labelUpdate: EventEmitter<any> = new EventEmitter();
  @Output() createIdea: EventEmitter<any> = new EventEmitter();
  @Output() deleteIdea: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log("Changed: ", this.idea.title);
    console.log(this.idea);
  }

  updateIdea() {
    console.log("Updating idea!");
    this.idea.title = (<HTMLInputElement>document.getElementById('idea_title_input')).value;
    this.idea.description = (<HTMLInputElement>document.getElementById('idea_desc_input')).value;
    this.labelUpdate.emit();
  }

  addIdea() {
    console.log("Adding idea");
    this.createIdea.emit();
  }

  removeIdea() {
    console.log("Removing idea");
    this.deleteIdea.emit();
  }
}
