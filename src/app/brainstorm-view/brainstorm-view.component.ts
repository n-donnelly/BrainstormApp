import { Component, OnInit } from '@angular/core';

import { IdeaService } from '../services/idea.service'
import { Idea } from '../model/idea'
import { IdeaList } from '../model/ideaList'
import { IdeaDetailViewComponent } from '../idea-detail-view/idea-detail-view.component';

declare var vis: any;

@Component({
  selector: 'brainstorm-view',
  templateUrl: './brainstorm-view.component.html',
  styleUrls: ['./brainstorm-view.component.css']
})
export class BrainstormViewComponent implements OnInit {

  nodes: any;
  edges: any;

  public ideaDetailCallback: Function;

  ideas: IdeaList;
  selectedIdea: Idea;
  hoverIdea: Idea;

  currentIndex: number;

  options = {
    nodes: {
      shape: 'box',
      font: {
        size:28
      }
    },
    physics: {
      enabled: false
    },
    interaction:{hover:true}
  };

  constructor(private ideaService: IdeaService) {
    this.nodes = new vis.DataSet([]);
    this.edges = new vis.DataSet([]);
  }
  
  ngOnInit() {
    var alias = this;
    var container = document.getElementById('brainstorm-view');
    this.ideaDetailCallback = this.updateNodeLabel.bind(this);

    this.ideaService.getRoot().subscribe((root: Idea) => this.initIdeas(root));

    var data = {
      nodes: this.nodes,
      edges: this.edges
    }
    var container = document.getElementById('brainstorm-view');
    var network = new vis.Network(container, data, this.options);
    network.on("click", function (params){
      if(params.nodes.length > 0) {
        alias.updateSelectedIdea(params.nodes[0]);
        alias.showDetailView(params.pointer);
      } else {
        alias.hideDetailView();
      }
    });

    network.on("hoverNode", function (params) {
      alias.updateHoveredIdea(params.node);
      alias.drawElementAt('quick-view', params.pointer);
    });

    network.on("blurNode", function(params) {
      alias.hideQuickView();
    });
  }

  showDetailView(pointer: any) {
    this.drawElementAt('idea-view', pointer);
    this.hideQuickView();
  }

  drawElementAt(elementId: string, pointer: any) {
    document.getElementById(elementId).style.visibility="visible";
    var canvas_width = document.getElementById('brainstorm-view').offsetWidth;
    var canvas_height = document.getElementById('brainstorm-view').offsetHeight;
    var width = document.getElementById(elementId).offsetWidth;
    var height = document.getElementById(elementId).offsetHeight;
    var x_pos = pointer.DOM.x;
    var y_pos = pointer.DOM.y;

    if((y_pos + height) > canvas_height)
      y_pos -= height;

    if((x_pos + width) > canvas_width)
      x_pos -= width;

    document.getElementById(elementId).style.top=y_pos+'px';
    document.getElementById(elementId).style.left=x_pos+'px';
  }

  hideAddIdeaView() {
    
  }

  hideDetailView() {
    document.getElementById('idea-view').style.visibility="hidden";
  }

  hideQuickView() {
    console.log("Hiding quick view");
    document.getElementById('quick-view').style.visibility="hidden";
  }

  updateSelectedIdea(index: number) {
    this.selectedIdea = this.ideas.getIdeaFromIndex(index);
    console.log(this.selectedIdea);
  }

  updateHoveredIdea(index: number) {
    this.hoverIdea = this.ideas.getIdeaFromIndex(index);
    console.log(this.hoverIdea);
  }

  updateNodeLabel() {
    this.nodes.update({id:this.selectedIdea.id, label:this.selectedIdea.title});
    console.log(this.nodes);
  }

  createIdea() {
    console.log("Creating idea");
  }

  removeIdea() {
    console.log("Removing idea");
  }

  initIdeas(root: Idea) {
    this.ideas = new IdeaList( root );
    this.selectedIdea = this.ideas.getIdeaFromIndex(0);
    this.loadIdeas();
  }

  loadIdeas() {
    for(let idea of this.ideas.ideas) {
      this.nodes.add( {id:idea.id, label: idea.title} );
      if(idea.parent != null){
        this.edges.add( {from:idea.parent.id, to: idea.id} );
      }
    }
  }

}
