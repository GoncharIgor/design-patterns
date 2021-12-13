// In human words: child classes have to be able to replace parent ones, without errors

// objects of a superclass shall be replaceable with objects of its subclasses without breaking the application.
// That requires the objects of your subclasses to behave in the same way as the objects of your superclass

// for example, if we have a f() that takes a base class, then this f() has also be able to take a child class without errors

// Solution - to add 3-rd fixing class, from whom you may safely extend from
// this is the biggest problem of OOP - not ability to extend from multiple classes
// try to use Composition over Inheritance

class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    setWidth(width){
        this.width = width;
    }

    setHeight(height){
        this.height = height;
    }

    get area() {
        return this.width * this.height;
    }

    toString(){
        return `${this.width} x ${this.height}`;
    }
}

class Square extends Rectangle {
    constructor(size) {
        super(size, size);
    }

    setWidth(width) {
        this.width = width;
        this.height = width;
    }

    setHeight(height) {
        this.height = height;
        this.width = height;
    }
}

// ideally, this function has to work correctly for both types of classed: Rect and Square
function increaseRectangleWidth(rectangle) {
    rectangle.setWidth(rectangle.width + 1);
}

const rect = new Rectangle(5,5);
const square = new Square(5);

console.log('Before increase:');
console.log(`Rectangle area: ${rect.area}`); // 25
console.log(`Square area: ${square.area}`); // 25

increaseRectangleWidth(rect);
increaseRectangleWidth(square);

console.log('After increase:');
console.log(`Rectangle area: ${rect.area}`); // 30
console.log(`Square area: ${square.area}`); // 36 - we would expect only width to be increased, but height was increased also

// Solution - to add 3-rd fixing class
class Shape {
    get area() {
        return this.width * this.height;
    }
}

// class Square extends Shape {
