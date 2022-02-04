// adding additional features/behavior without changing existing class
// Possible options:
// - inherit from existing class
// - build decorator - class that references the decorated object

// Decorator - a class that wraps and original class and adds additional functionality
// it keeps the reference to the decorated object

// Main idea:
// To pass original class object inside a constructor of a wrapper one,
// so the passed original class will be just a property of a wrapper

class Shape {
    constructor() {
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    resize(factor) {
        this.radius *= factor;
    }

    toString() {
        return `A circle of radius ${this.radius}`;
    }
}

// Decorator implementation
class ColoredShape extends Shape {
    constructor(shape, color) {
        super();
        this.shape = shape;
        this.color = color;
    }

    // overriding original f()
    toString() {
        return `${this.shape.toString()} has the ${this.color} color`;
    }
}

const circle = new Circle(2);
console.log(circle.toString());

// making decoration
const redCircle = new ColoredShape(circle, 'red');
console.log(redCircle.toString());

// we can compose decorators - wrap 1 decorator around another

class TransparentShape extends Shape {
    constructor(shape, transparency) {
        super();
        this.shape = shape;
        this.transparency = transparency;
    }

    // overriding original f()
    toString() {
        return `${this.shape.toString()} and has the ${this.transparency * 100.0}% transparency`;
    }
}

const transparentRedCircle = new TransparentShape(redCircle, 0.5);
console.log(transparentRedCircle.toString());``

// limitation - we don't have access to the f()s on the same level of abstraction:
// we are extending Shape, but not Circle
// thus we can't call resize() f() on "redCircle" object
// redCircle.resize() - not works
// how we can do it - to go through properties:

transparentRedCircle.shape.shape.resize(5); // works. We chain up to "redCircle" object, that has resize() f()
console.log(transparentRedCircle.toString());

