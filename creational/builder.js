// TLDR: in order no to have a creation of classes with necessity of passing 10 arguments in constructor,
// we split this by calling a f() in each constructor argument

// inconvenient way
const hello = 'hello';
let html = [];

html.push(`<p>${hello}</p>`);

console.log(html.toString());
console.log('-----');

const words = ['hello', 'world'];
html = [];
html.push('<ul>\n');

words.forEach(word => {
    html.push(`  <li>${word}</li>\n`)
});

html.push('</ul>');

console.log(html.join(''));

// convenient Builder approach
// This class is designed to work with a Builder
class Tag {
    static identSize = 2;

    constructor(name, text) {
        this.name = name;
        this.text = text;
        this.children = [];
    }

    toStringImpl(ident) {
        const html = [];
        const i = ' '.repeat(ident * Tag.identSize);

        html.push(`${i}<${this.name}>\n`);

        if (this.text) {
            html.push(' '.repeat(++ident * Tag.identSize))
            html.push(this.text + '\n');
        }
        this.children.forEach(child => html.push(child.toStringImpl(ident + 1)));

        html.push(`${i}</${this.name}>\n`);
        return html.join('');
    }

    toString() {
        return this.toStringImpl(0); // 0 - level of depth in html tree
    }

    static create(name) {
        return new HtmlBuilder(name);
    }
}

class HtmlBuilder {
    constructor(rootName) {
        this.root = new Tag(rootName);
        this.rootName = rootName;
    }

    addChild(childName, childText) {
        const child = new Tag(childName, childText);
        this.root.children.push(child);
    }

    // fluent interface - chaining calls
    addChildFluent(childName, childText) {
        const child = new Tag(childName, childText);
        this.root.children.push(child);
        return this; // returning a reference to the object
    }

    toString() {
        return this.root.toString();
    }

    clear() {
        this.root = new Tag(this.rootName);
    }

    build() {
        return this.root;
    }
}

console.log('--- Builder approach ---');

// const builder = new HtmlBuilder('ul');
// instead of initializing HtmlBuilder object directly, we do it by calling a f()
const builder = Tag.create('ul');

words.forEach(word => {
    builder.addChild('li', word);
});

console.log(builder.toString());

console.log('----- Chaining calls -----');

builder.clear();

builder
    .addChildFluent('li', 'foo')
    .addChildFluent('li', 'bar')
    .addChildFluent('li', 'baz');

console.log(builder.toString());
