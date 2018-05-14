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
    }
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
      alias.updateSelectedIdea(params.nodes[0]);
    });
  }

  updateSelectedIdea(index: number) {
    this.selectedIdea = this.ideas.getIdeaFromIndex(index);
    console.log(this.selectedIdea);
  }

  updateNodeLabel() {
    this.nodes.update({id:this.selectedIdea.id, label:this.selectedIdea.title});
    console.log(this.nodes);
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
