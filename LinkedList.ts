class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList<T> {
  head: ListNode<T> | null;
  constructor() {
    this.head = null;
  }

  append(value: T): void {
    if (!this.head) {
      this.head = new ListNode(value);
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = new ListNode(value);
  }

  prepend(value: T): void {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  printList(): void {
    const printable: T[] = [];
    let current = this.head;
    while (current) {
      printable.push(current.value);
      current = current.next;
    }
    console.log(printable);
  }
}

// Creating and Printing a LinkedList:
const linkedList = new LinkedList();
linkedList.append('2');
linkedList.prepend('1');
linkedList.append('3');
linkedList.append('4');
linkedList.printList();
