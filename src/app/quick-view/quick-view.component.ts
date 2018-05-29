import { Component, OnInit, Input } from '@angular/core';
import { Idea } from '../model/idea';

@Component({
  selector: 'quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {

  @Input() idea: Idea;

  constructor() { }

  ngOnInit() {
  }

}
