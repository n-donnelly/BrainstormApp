import { Idea } from './model/idea';

export var SAMPLE_ROOT = new Idea(0, "Idea Root", null);
export var IDEA_INDEX = 3;

var child1 = new Idea(1, "Character", SAMPLE_ROOT);
SAMPLE_ROOT.isRoot = false;
SAMPLE_ROOT.description = "Sample description";
SAMPLE_ROOT.addTag("Sample tag");
SAMPLE_ROOT.addChild(child1);
SAMPLE_ROOT.addChild(new Idea(2, "Location", SAMPLE_ROOT));

child1.addChild(new Idea(3, "Friend", child1));
child1.addChild(new Idea(4, "Event", child1));