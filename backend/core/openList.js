class OpenList {
    constructor(array) {
        this.array = array;
        this.length = 0;
    }
    get(index) {
        return this.array[index];
    }

    incSize() {
        this.length += 1;
    }

    decSize() {
        this.length -= 1;
    }

    empty() {
        return this.length === 0;
    }
}

