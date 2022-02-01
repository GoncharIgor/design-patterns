// connecting components together through abstractions
// Prevents "Cartesian product" complexity explosion

// example: you need to have LightUtility and DarkUtility that has to work with: UNIX and Windows
// it ends with 2x2 classes: LightUtilityUnix, LightUtilityWindows, DarkUtilityUnix, DarkUtilityWindows

// Bridge - a mechanism that decouples an interface from an implementation

// TlDR: add 1 hierarchy of classes to another hierarchy, via constructor

class Shape {
    constructor(renderer) {
        this.renderer = renderer;
    }
}

class Circle extends Shape {
    constructor(renderer, radius) {
        super(renderer);
        this.radius = radius;
    }

    draw() {
        this.renderer.renderCircle(this.radius);
    }

    resize(factor) {
        this.radius *= factor;
    }
}

class Square {

}

class Renderer {

}

class VectorRenderer extends Renderer{
    renderCircle (radius) {
        console.log(`Drawing a circle of radius ${radius}`);
    }

    renderSquare() {
        console.log('Rendering Vector square');
    }
}

class RasterRenderer {
    renderCircle (radius) {
        console.log(`Drawing pixels for a circle of radius ${radius}`);
    }

    renderSquare() {
        console.log('Rendering Raster square');
    }
}

// Hierarchy of shapes: Square, Circle, Triangle, ...

// Hierarchy of renderers: Vector, Raster, ...

// We need a bridge between shapes and renderer hierarchies
// 1 of options - to put Renderer inside the Shape

const rasterRenderer = new RasterRenderer();
const vectorRenderer = new VectorRenderer();

const circle = new Circle(vectorRenderer, 5);
circle.draw();
circle.resize(2)
circle.draw();

// here we saved code from adding new classes: CircleVector, CircleRaster, SquareVector, SquareRaster
// limitation - increasing amount of methods inside renderer that will equal amount of shapes
