class DoubleListNode<T> {
  value: T;
  next: DoubleListNode<T> | null;
  previous: DoubleListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

class DoubleLinkedList<T> {
  head: DoubleListNode<T> | null;
  tail: DoubleListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value: T): void {
    const newNode = new DoubleListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    if (this.tail) {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
    }
  }

  prepend(value: T): void {
    const newNode = new DoubleListNode(value);
    newNode.next = this.head;
    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
  }

  printListForward(): void {
    const list: T[] = [];
    let current = this.head;
    while (current) {
      list.push(current.value);
      current = current.next;
    }
    console.log(list);
  }

  printListBackward(): void {
    const list: T[] = [];
    let current = this.tail;
    while (current) {
      list.push(current.value);
      current = current.previous;
    }
    console.log(list);
  }
}

const doubleLinkedList = new DoubleLinkedList();
doubleLinkedList.append(3);
doubleLinkedList.prepend(2);
doubleLinkedList.prepend(1);
doubleLinkedList.append(4);

doubleLinkedList.printListForward(); // [1, 2, 3, 4]
doubleLinkedList.printListBackward(); // [4, 3, 2, 1]

console.log(doubleLinkedList.head?.next?.value); // 2
console.log(doubleLinkedList.head?.next?.next?.previous?.previous?.value); // 1
