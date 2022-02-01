// Adaptor - getting the interface you want from the interface you have
// Steps for its implementation:
// 1. Determine the API you have and the API you need to target
// 2. Create component that consumes your API and converts it to be working with target one
// 3. Good practice - to have caching in the adaptor

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

// consists of 2 points
class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    toString() {
        return `${this.start.toString()} -> ${this.end.toString()}`
    }
}

// VectorObject - basically an array of lines
class VectorObject extends Array {
}

class VectorRectangle extends VectorObject {
    constructor(x, y, width, height) {
        super();
        // push() f() works for object instance, because we extend class from Array
        this.push(new Line(new Point(x, y), new Point(x + width, y)));
        this.push(new Line(new Point(x + width, y), new Point(x + width, y + height)));
        this.push(new Line(new Point(x, y), new Point(x, y + height)));
        this.push(new Line(new Point(x, y + height), new Point(x + width, y + height)));
    }
}

// this is the target desirable API, with which we have to work with
const drawPoint = (point) => {
    process.stdout.write('.'); // console.log() calls process.stdout.write with formatted output
}

// if we want to draw vector objects below, using the drawPoint() api above - we need adaptor
// (we need to transform every line in a set of points). We need line-to-point adaptor
const vectorObjects = [
    new VectorRectangle(1, 1, 10, 10),
    new VectorRectangle(2, 2, 5, 5)
];

class LineToPointAdaptor extends Array {
    static count = 0;

    constructor(line) {
        super();
        console.log(`${LineToPointAdaptor.count++}: Generating points for line ${line.toString()} (no caching)`);

        const left = Math.min(line.start.x, line.end.x);
        const right = Math.max(line.start.x, line.end.x);
        const top = Math.min(line.start.y, line.end.y);
        const bottom = Math.max(line.start.y, line.end.y);

        if (right - left === 0) {
            for (let y = top; y <= bottom; ++y) {
                this.push(new Point(left, y))
            }
        } else if (line.end.y - line.start.y === 0) {
            for (let x = left; x <= right; ++x) {
                this.push(new Point(x, top))
            }
        }
    }
}

// LineToPointAdaptor.count = 0; // another way to create a static field
// Static fields can be called from non-static f()s

const drawPoints = () => {
    for (let vectorObject of vectorObjects) {
        for (let line of vectorObject) {
            const adaptor = new LineToPointAdaptor(line);
            adaptor.forEach(drawPoint);
        }
    }
}

drawPoints();
