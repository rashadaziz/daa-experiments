class BucketElement {
  constructor(node) {
    this.node = node;
    this.next = null;
    this.prev = null;
  }
}

class Bucket {
  constructor() {
    this.head = new BucketElement("HEAD");
    this.tail = new BucketElement("TAIL");
    this.tail.prev = this.head;
    this.head.next = this.tail;
  }
  insertFront(bucketElement) {
    const nextElement = this.head.next;
    this.head.next = bucketElement;
    bucketElement.prev = this.head;
    nextElement.prev = bucketElement;
    bucketElement.next = nextElement;
  }
  popFront() {
    if (this.head.next !== this.tail) {
      let popped = this.head.next;
      this.head.next = popped.next;
      popped.next.prev = this.head;
      return popped;
    }
  }
  pop(element) {
    let prev = element.prev;
    prev.next = element.next;
    element.next.prev = prev;
    return element;
  }
  isEmpty() {
      return this.head.next === this.tail;
  }
  find(node) {
    let currentElement = this.head.next
    while (currentElement !== this.tail) {
      if (currentElement.node === node) {
        return currentElement
      }
      currentElement = currentElement.next
    }
  }
}

