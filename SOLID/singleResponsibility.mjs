import fs from 'fs';
import path from 'path';

// AntiPattern - God Object

// class doesn't have access to instance fields, only to static
// object doesn't have access to static fields, only to instance

class Journal {
    static count = 0; // creation of static field inside class

    constructor() {
        this.entries = {}
    }

    addEntry(text) {
        const updatedCounter = ++Journal.count;
        const entry = `${updatedCounter}: ${text}`;
        this.entries[updatedCounter] = entry;
        return updatedCounter;
    }

    removeEntry(index) {
        delete this.entries[index];
    }

    toString() {
        return Object.values(this.entries).join('\n');
    }
}

class PersistenceManager {
    static saveToFile(fileName, journal) {
        const __dirname = path.resolve()
        const filePath = path.join(__dirname, fileName);

        fs.writeFile(filePath, journal.toString(), () => {
            console.log('File was successfully written');
        })
    }
}

Journal.anotherStaticField = 'anotherStaticField'; // creation of static field outside class

const firstsJournal = new Journal();
firstsJournal.addEntry('My first task');
firstsJournal.addEntry('My second task');

const book = new Journal();
book.addEntry('Third');


firstsJournal.addEntry('My third task');
console.log(firstsJournal.toString());
// 1: My first task
// 2: My second task
// 4: My third task // since we have a static counter, the 3-rd index will be given to 'book' object

PersistenceManager.saveToFile('test.txt', firstsJournal);
