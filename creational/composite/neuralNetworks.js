// we have Neuron classes that can be connected to each other
// Task: we want to have ability to:
// - connect them also to layers (collection of neurons)
// - layers connect to neurons
// - connect layer to another layer
// Problem: we don't want to implement 4 different methods to connect: n-n, n-L, L-n, L-L
// we want only 1 method: connectTo

// implementation detail: we need to convert all entities (single objects and collections) to iterable objects
// collection has to be mixin (extending both Connectable and Array classes)


// https://stackoverflow.com/questions/29879267/
let aggregation = (baseClass, ...mixins) => {
    class base extends baseClass {
        constructor(...args) {
            super(...args);
            mixins.forEach((mixin) => {
                copyProps(this, (new mixin));
            });
        }
    }

    let copyProps = (target, source) => {  // this function copies all properties and symbols, filtering out some special ones
        Object.getOwnPropertyNames(source)
            .concat(Object.getOwnPropertySymbols(source))
            .forEach((prop) => {
                if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
                    Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
            })
    };
    mixins.forEach((mixin) => {
        // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
    });
    return base;
};

class Connectable {
    connectTo(otherEntity) {
        for (let fromEntity of this) {
            for (let toEntity of otherEntity) {
                fromEntity.out.push(toEntity);
                toEntity.in.push(fromEntity);
            }
        }
    }
}

class Neuron extends Connectable {
    constructor() {
        super();

        this.in = [];
        this.out = [];
    }

    /*
    old approach, that was not working with layers. Solution - create Connectable class
    connectToOtherNeuron(otherNeuron) {
        this.out.push(otherNeuron);
        otherNeuron.in.push(this);
    }*/


    toString() {
        return `A neuron with ${this.in.length} inputs and ${this.out.length} outputs`;
    }

    // in order to work with Connectable, class Neuron has to be iterable,
    // but it has only to return 1 instance from iteration - itself

    // A single object can make itself iterable by yielding "this" on the first run, telling consumer further - "done"

    // Symbol.iterator - Whenever an object needs to be iterated,
    // its @@iterator method is called with no arguments, and the returned "iterator" is used to obtain the values to be iterated
    [Symbol.iterator]() { // "iterator" symbol will be used when smb does "for" iteration
        let returned = false;
        return {
            next: () => ({value: this, done: returned++}) // returned++ - changing false to true
        }
    }
}

// NeuronLayer - basically a collection of neurons
class NeuronLayer extends aggregation(Array, Connectable) {
    constructor(count) {
        super();

        // while count goes to zero. The same as: (count-- > 0)
        while (count-- > 0) {
            this.push(new Neuron());
        }
    }

    toString() {
        return `A layer with ${this.length} neurons`;
    }
}


const neuron1 = new Neuron();
const neuron2 = new Neuron();
const layer1 = new NeuronLayer(3);
const layer2 = new NeuronLayer(4);

neuron1.connectTo(neuron2);
neuron1.connectTo(layer1);
layer2.connectTo(neuron1);
layer1.connectTo(layer2);

console.log(neuron1.toString());
console.log(neuron2.toString());
console.log(layer1.toString());
console.log(layer2.toString());
