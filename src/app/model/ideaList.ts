import {Idea} from './idea';

export class IdeaList {

    private _ideas: Idea[];

    constructor(root: Idea) {
        this.setList(root);
    }

    get ideas() : Idea[] {
        return this._ideas;
    }

    set ideas(ideas: Idea[]) {
        this._ideas = ideas;
    }

    setList(root: Idea) {
        this._ideas = root.getAllChildren();
    }

    getIdeaFromIndex(id: number) : Idea {
        console.log("Looking for at index:", id);
        for(let idea of this._ideas) {
            if(idea.id === id) {
                return idea;
            }
        }
    }
}