// defines relationships that you have between low- and high-level modules
// high-level modules should not directly depend on low level ones
// parents should NOT know what's going on with their children

const Relationship = Object.freeze({
    PARENT: 0,
    CHILD: 1,
    SIBLING: 2
});

class Person {
    constructor(name) {
        this.name = name;
    }
}

// low-level module (class)
// concerned with low-level functionality, like storage
class Relationships {
    constructor() {
        this.data = [];
    }

    addParentAndChild(parent, child) {
        this.data.push({
            from: parent,
            type: Relationship.PARENT,
            to: child
        });
    }
}

// high-level module. High level business logics
class Research {
    constructor(relationships) {
        // find all children of John
        const relations = relationships.data; // high level module depends on the implementation of a low level one. This is incorrect

        for (let rel of relations.filter(r => r.from.name === 'John' && r.type === Relationship.PARENT)) {
            console.log(`John has a child ${rel.to.name}`);
        }
    }
}

const parent = new Person('John');
const child1 = new Person('Chris');
const child2 = new Person('Matt');

const relationships = new Relationships();
relationships.addParentAndChild(parent, child1);
relationships.addParentAndChild(parent, child2);

new Research(relationships);

// solution
class RelationshipBrowser {
    // this is the simulation of abstract classes in JS
    constructor() {
        if (this.constructor.name === 'RelationshipBrowser') {
            throw new Error('RelationshipBrowser class is abstract')
        }
    }

    findAllChildrenOf(personName) {
    } // like defining an interface in TS
}

class UpdatedRelationships extends RelationshipBrowser {
    constructor() {
        super();
        this.data = [];
    }

    addParentAndChild(parent, child) {
        this.data.push({
            from: parent,
            type: Relationship.PARENT,
            to: child
        });
    }

    // we've moved here interaction with storage from "Research" class
    // now, if storage changes - we'll modify only this class
    findAllChildrenOf(personName) {
        return this.data.filter(relationship => {
            return relationship.from.name === personName && relationship.type === Relationship.PARENT
        }).map(relationship => relationship.to);
    }
}

class ResearchUpdated {
    constructor(browser) {
        // the same as:
        // browser.findAllChildrenOf('John').forEach(person => console.log)
        for(let person of browser.findAllChildrenOf('John')) {
            console.log(`John has a child called ${person.name}`);
        }
    }
}

console.log('--- Updated Approach ---');

const updatedRelationships = new UpdatedRelationships();
updatedRelationships.addParentAndChild(parent, child1);
updatedRelationships.addParentAndChild(parent, child2);

new ResearchUpdated(updatedRelationships);
