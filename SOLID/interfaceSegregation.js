// TLDR: instead of having big interface with many f()s - split him on many smaller interfaces
// then instead of extending 1 big class (in TS - 1 interface implementation) - you'll aggregate small ones
// aggregation vs inheritance

class Machine {
    // this is the simulation of abstract classes in JS
    constructor() {
        if (this.constructor.name === 'Machine') {
            throw new Error('Machine class is abstract')
        }
    }

    print(doc) {
    }

    fax(doc) {
    }

    scan(doc) {
    }
}

// this is the simulation of extending Abstract class
// also can be used to simulate interfaces implementation
class MultiFunctionalPrinter extends Machine {
    print(doc) {
        // print method implementation
        console.log('print from child');
    }

    fax(doc) {
        // fax method implementation
    }

    scan(doc) {
        // scan method implementation
    }
}

class NotImplementedError extends Error {
    constructor(name) {
        const message = `${name} function is not implemented`;
        super(message);
        // if error has StackTrace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotImplementedError)
        }
    }
}

// problem - printer will implement fax() and scan() f()s, that he hasn't to
// if you don't implement f() in child - then parent's f() will be called
class OldPrinter extends Machine {

    // 1-st way to fix: empty f()
    fax(doc) {
        // if method is empty, it'll just do nothing
    }

    // 2-nd way to fix: throw error on not supported f()
    scan(doc) {
        throw new Error('scan method is not implemented')
    }

    // we can even define custom error for better debugging
    scanUpdated(doc) {
        throw new NotImplementedError('OldPrinter.scan');
    }
}


// Fixing the problem above:
class Printer {
    constructor() {
        if (this.constructor.name === 'Printer') {
            throw new Error('Printer class is abstract')
        }
    }

    print(doc) {

    }
}

class Scanner {
    constructor() {
        if (this.constructor.name === 'Scanner') {
            throw new Error('Scanner class is abstract')
        }
    }

    scan(doc) {

    }
}

// in TS we would implement different small interfaces
// class PhotoCopier implements Scanner, Printer {}
