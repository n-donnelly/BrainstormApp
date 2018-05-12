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

    //this.nodes = new vis.DataSet([]);
    //this.edges = new vis.DataSet([]);
  }

  ngOnInit() {
    /*
    var container =document.getElementById('network');

    var data = {
      nodes: this.nodes,
      edges: this.edges
    };

    this.nodes.add( {id: 1, label: "Node 1"});
    this.nodes.add( {id: 2, label: "Node 2"});
    this.nodes.add( {id: 3, label: "Node 3"});

    this.edges.add({from: 1, to: 2});
    this.edges.add({from: 2, to: 3});
    this.edges.add({from: 3, to: 1});

    var options = {
      nodes: {
        shape: 'box',
        color: '#ffffff',
        font: {
          size:28
        }
      },
      physics: {
        enabled: true
      }
    };

    var network = new vis.Network(container, data, options);
    */
  }
}
