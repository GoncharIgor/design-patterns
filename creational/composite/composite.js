// Treating individual and aggregate objects uniformly

// a class has a property, that is the collection of other objects

// GraphicObject can act either as a group of objects, or as a standalone Obj
class GraphicObject {
    static count = 0;

    constructor(name = `Group ${GraphicObject.count++}`) {
        this._name = name;
        this.color = undefined;
        this.children = [];
    }

    get name() {
        return this._name;
    }

    print(buffer, depth) {
        buffer.push('*'.repeat(depth));
        if (depth > 0) {
            buffer.push(' ');
        }
        if (this.color) {
            buffer.push(this.color + ' ');
        }
        buffer.push(this.name);
        buffer.push('\n');

        this.children.forEach(child => {
            child.print(buffer, depth + 1);
        })
    }

    toString() {
        let buffer = [];
        this.print(buffer, 0);

        return buffer.join('');
    }
}

class Circle extends GraphicObject {
    constructor(color) {
        super('Circle');
        this.color = color;
    }
}

class Square extends GraphicObject {
    constructor(color) {
        super('Square');
        this.color = color;
    }
}

//making an Object, that consists of multiple other Graphic objects
const drawing = new GraphicObject();
drawing.children.push(new Square('red'));
drawing.children.push(new Circle('blue'));

// here is real implementation of composite pattern:
const group = new GraphicObject();
group.children.push(new Circle('yellow'));
group.children.push(new Square('yellow'));

// adding group to a group
drawing.children.push(group);

// Squares, Circles and GraphicObjects are treated in the same manner
// if I call toString on any object - it'll work the same
console.log(drawing.toString());
