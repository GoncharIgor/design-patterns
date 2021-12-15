// problem - JS can't have multiple constructors, that can be overloaded
// and, especially - to have constructor with the same amount of arguments, but with their different naming

// factory method - a static method that allows to create an object
// benefits:
// - good name of method
// - names for parameters
// - less arguments in constructor

const CoordinateSystem = {
    cartesian: 0,
    polar: 1
};

class Point {
    constructor(a, b, coordinateSyst = CoordinateSystem.cartesian) {
        switch (coordinateSyst) {
            case CoordinateSystem.cartesian:
                this.x = a;
                this.y = b;
                break;
            case CoordinateSystem.polar:
                this.x = a * Math.cos(b);
                this.y = a * Math.sin(b);
                break;
        }
    }
}

const cartesianPoint = new Point(2,3, CoordinateSystem.cartesian);
console.log(cartesianPoint);

class PointWithFactoryMethodApproach {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // static factory methods could live here, but it would break Single Responsibility principle
}

// if you have static counter - it should be placed not in Entity, but in its factory class
class PointFactory {
    // f() for creation of an Object. Now we can create object both: with constructor and static method
    // and static method name gives us understanding what kind of object we'll create
    static newCartesianPoint(x, y) {
        return new PointWithFactoryMethodApproach(x, y);
    }

    static newPolarPoint(rho, theta) {
        return new PointWithFactoryMethodApproach(
            rho * Math.cos(theta),
            rho * Math.sin(theta)
        )
    }
}

const updatedCartesianPoint = PointFactory.newCartesianPoint(2, 3);
console.log(updatedCartesianPoint);

const updatedPolarPoint = PointFactory.newPolarPoint(2, 3);
console.log(updatedPolarPoint);
