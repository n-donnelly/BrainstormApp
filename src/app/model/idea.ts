export class Idea {

    private _id: number;
    private _parent: Idea;
    private _children: Idea[];

    private _title: String;
    private _description: String;
    private _tags: String[] = [];

    private _isRoot: boolean;

    constructor(id: number, title: String, parent: Idea) {
        this._id = id;
        this._title = title;
        this._children = [];
        this._parent = parent;
        this._description = "";
        this._tags = [];

        this._isRoot = parent == null;
    }

    get id() : number {
        return this._id;
    }

    get isRoot() : boolean {
        return this._isRoot;
    }

    set isRoot(isRoot: boolean) {
        this._isRoot = isRoot;
    }

    get parent() : Idea {
        return this._parent;
    }

    get title() : String {
        return this._title;
    }

    set title(title: String) {
        this._title = title;
    }

    get description() : String {
        return this._description;
    }

    set description(description : String) {
        this._description = description;
    }

    get children() : Idea[] {
        return this.children;
    }

    getAllChildren() : Idea[] {
        var ideas: Idea[] = [this];
        for(let child of this._children) {
            ideas = ideas.concat(child.getAllChildren());
        }
        return ideas;
    }
 
    set children(children: Idea[]) {
        this._children = children;
    }

    addChild(child: Idea) {
        this._children.push(child);
    }

    removeChild(child: Idea) : boolean {
       var index = this._children.indexOf(child, 0);
       if(index > -1) {
           this._children.splice(index,1);
           return true;
       }
       return false;
    }

    removeChildByIndex(index: number) : boolean {
        if(index > -1 && index < this._children.length) {
            this._children.splice(index,1);
            return true;
        }
        return false;
     }

     get tags() : String[] {
         return this._tags;
     }
 
     set tags(tags : String[]) {
         this._tags = tags;
     }
 
     addTag(tag : String) {
         this._tags.push(tag);
     }
 
     removeTag(index : number) : boolean {
         if(index > -1 && index < this._tags.length) {
             this._tags.splice(index, 1);
             return true;
         }
         return false;
     }
}