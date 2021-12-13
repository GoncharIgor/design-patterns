// Problem:
// const myHouse = new House(‘John Street 14’, 4, true, true);

export class House {
    constructor(houseBuilder) {
        this.address = houseBuilder.address; // address - getter from "HouseBuilder" class
        this.floorNumber = houseBuilder.floorNumber;
        this.isHavingParking = houseBuilder.isHavingParking;
        this.isHavingGarden = houseBuilder.isHavingGarden;
    }
}

export class HouseBuilder {

    constructor(address) {
        this._address = address;
    }

    setFloor(floor) {
        this._floorNumber = floor;
        return this;
    }

    makeParking() {
        this._isHavingParking = true;
        return this;
    }

    makeGarden() {
        this._isHavingGarden = true;
        return this;
    }

    build() {
        return new House(this);
    }

    get isHavingParking() {
        return this._isHavingParking;
    }

    get isHavingGarden() {
        return this._isHavingGarden;
    }

    get address() {
        return this._address;
    }

    get floorNumber() {
        return this._floorNumber;
    }
}

const myHouse = new HouseBuilder('Adder')
    .setFloor(5)
    .makeGarden()
    .makeParking()
    .build();
