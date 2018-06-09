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
  rootIdea: Idea;
  selectedIdea: Idea;
  hoverIdea: Idea;
  newIdeaTitle: string;
  idArray: number[];

  latestId: number;

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
    this.latestId=0;
    this.idArray = new Array();
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
        alias.hideAllViews();
        alias.updateSelectedIdea(params.nodes[0]);
        alias.showDetailView(params.pointer);
      } else {
        alias.hideAllViews();
      }
    });

    network.on("dragStart", function (params){
      alias.hideAllViews();
    });

    network.on("hoverNode", function (params) {
      alias.updateHoveredIdea(params.node);
      //alias.drawElementAt('quick-view', params.pointer);
    });

    network.on("blurNode", function(params) {
      alias.hideQuickView();
    });
  }

  showDetailView(pointer: any) {
    this.drawElementAdjustedAt('idea-view', pointer);
    this.hideQuickView();
  }

  showAddView() {
    var pointer = this.getPointerFromElement('detail-view');
    this.hideAllViews();
    this.drawElementAt('add-view', pointer);
  }

  showRemoveView() {
    var pointer = this.getPointerFromElement('detail-view');
    this.hideAllViews();
    this.drawElementAt('remove-view', pointer)
  }

  getPointerFromElement(elementId: string) {
    var elem = document.getElementById('idea-view');
    var xStr = document.getElementById('idea-view').style.left;
    var yStr = document.getElementById('idea-view').style.top;

    return ({'DOM':{x:xStr.substring(0, xStr.length-2), y:yStr.substring(0, yStr.length-2)}});
  }

  drawElementAt(elementId: string, pointer: any){
    document.getElementById(elementId).style.visibility="visible";
    document.getElementById(elementId).style.top=pointer.DOM.y+'px';
    document.getElementById(elementId).style.left=pointer.DOM.x+'px';
  }

  drawElementAdjustedAt(elementId: string, pointer: any) {
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

  hideAllViews() {
    this.hideAddIdeaView();
    this.hideDetailView();
    this.hideRemoveView();
    this.hideQuickView();
  }

  hideAddIdeaView() {
    this.newIdeaTitle = '';
    document.getElementById('add-view').style.visibility="hidden";
  }

  hideDetailView() {
    document.getElementById('idea-view').style.visibility="hidden";
  }

  hideRemoveView() {
    document.getElementById('remove-view').style.visibility="hidden";
  }

  hideQuickView() {
    //console.log("Hiding quick view");
    //document.getElementById('quick-view').style.visibility="hidden";
  }

  updateSelectedIdea(index: number) {
    this.selectedIdea = this.ideas.getIdeaFromIndex(index);
    console.log("Selected Idea: " + this.selectedIdea);
  }

  updateHoveredIdea(index: number) {
    this.hoverIdea = this.ideas.getIdeaFromIndex(index);
  }

  updateNodeLabel() {
    this.nodes.update({id:this.selectedIdea.id, label:this.selectedIdea.title});
  }

  createIdea() {
    console.log("Creating idea: " + this.newIdeaTitle);
    var newIdea = new Idea(this.loadNextId(), this.newIdeaTitle, this.selectedIdea);
    this.selectedIdea.addChild(newIdea);
    this.ideas.setList(this.rootIdea);
    this.nodes.add({id: newIdea.id, label: newIdea.title });
    this.edges.add( {from: newIdea.parent.id, to: newIdea.id });
    this.hideAddIdeaView();
  }

  removeIdea() {
    console.log("Removing idea");

    if(this.selectedIdea.parent != null) {
      this.selectedIdea.parent.removeChild(this.selectedIdea);
      this.ideas.setList(this.rootIdea);
      this.nodes.remove(this.selectedIdea.id);
      this.selectedIdea = null;
    } else {
      console.log("Attempting to delete root node");
    }
    this.hideAllViews();
  }

  initIdeas(root: Idea) {
    this.rootIdea = root;
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
      this.idArray.push(idea.id);
    }
  }

  loadNextId() {
    var newNum = this.latestId + 1;
    while(this.idArray.indexOf(newNum) > -1) {
      newNum++;
    }

    this.latestId = newNum;
    return newNum;
  }
}