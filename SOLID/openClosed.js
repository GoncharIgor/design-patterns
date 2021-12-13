// TLDR: don't create 1 big Filtering class, but create a separate class for each filter

// Open for extension, closed for modification
// try not to jump in the class and add new functions, props or other changes
// class may already be tested and used in production by many other parts of the App

// JS doesn't have Enums, so this is a workaround:
const Color = Object.freeze({
    RED: 'red',
    GREEN: 'green',
    BLUE: 'blue',
});

const Size = Object.freeze({
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
})

class Product {
    constructor(name, color, size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

// having a separate class for all kind of Product filtering operation - is incorrect approach
// we may possible end with have state space explosion (possibility of adding new and new types of methods)
class IncorrectProductFilter {
    filterByColor(products, color) {
        return products.filter(product => product.color === color);
    }

    filterBySize(products, size) {
        return products.filter(product => product.size === size);
    }
}

// correct approach - specification
// a good thing - to have an abstract class Specification with isSatisfied method (interface)
// and then to implement (extend in JS language) in child SizeSpecification, or any other specification

class ColorSpecification {
    constructor(color) {
        this.color = color;
    }

    isSatisfied(item) {
        return item.color === this.color;
    }
}

class SizeSpecification {
    constructor(size) {
        this.size = size;
    }

    isSatisfied(item) {
        return item.size === this.size;
    }
}

class BetterProductFilter {
    filter(items, spec) {
        return items.filter(item => spec.isSatisfied(item));
    }
}

// If necessity to have a new filter appear - we won't touch already existing, tested and used in prod classes


// Combinator - when we need to combine filter methods
class AndSpecification {
    constructor(...specs) {
        this.specs = specs;
    }

    isSatisfied(item) {
        return this.specs.every(specification => specification.isSatisfied(item));
    }
}

const apple = new Product('Apple', Color.GREEN, Size.SMALL);
const tree = new Product('Tree', Color.GREEN, Size.LARGE);
const house = new Product('House', Color.BLUE, Size.LARGE);

const products = [apple, tree, house];


// incorrect way - all filters in 1 class
console.log('Old approach of filtering green products:');
const incorrectProductFilter = new IncorrectProductFilter();

// first - filtering is done, and only then - iteration on the result
for (let product of incorrectProductFilter.filterByColor(products, Color.GREEN)) {
    console.log(`- ${product.name} is green`);
}


// correct way - with specifications
console.log('New approach of filtering green products:');
const betterFilter = new BetterProductFilter();

for (let product of betterFilter.filter(products, new ColorSpecification(Color.GREEN))) {
    console.log(`- ${product.name} is green`);
}

console.log('Large and green products:');
const combinedSpecification = new AndSpecification(
    new ColorSpecification(Color.GREEN),
    new SizeSpecification(Size.LARGE)
);

for (let product of betterFilter.filter(products, combinedSpecification)) {
    console.log(`- ${product.name} is green and large`);
}
