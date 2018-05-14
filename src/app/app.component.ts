import { Component, OnInit, ElementRef } from '@angular/core';
import { visitAll } from '@angular/compiler';

declare var vis: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  nodes: any;
  edges: any;

  constructor(private element: ElementRef) {
    this.title = 'app';
  }

  ngOnInit() {
    
  }
}
