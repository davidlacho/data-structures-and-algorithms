# Data Structures

## Linked Lists

Linked Lists are a fundamental data structure in computer science, used to store collections of elements. They consist of nodes where each node contains data and a reference (or a link) to the next node in the sequence. This structure allows for efficient insertion and removal of elements from any position in the list without necessitating a reorganization of the entire data structure.

**Types of Linked Lists**

1. **Singly Linked List**: Each node has one link to the next node.
2. **Doubly Linked List**: Each node has two links, one to the next node and another to the previous node.
3. **Circular Linked List**: The last node is linked to the first node, creating a circular chain.

**Singly Linked List Example**

```tsx
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

    // Add a new node at the end
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

    // Insert a new node at the beginning
    prepend(value: T): void {
        const newNode = new ListNode(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    // Print the linked list
    printList(): void {
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }
}

```

**Doubly Linked List**

```tsx
class DoubleListNode<T> {
    value: T;
    next: DoubleListNode<T> | null;
    prev: DoubleListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList<T> {
    head: DoubleListNode<T> | null;
    tail: DoubleListNode<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Add a new node at the end
    append(value: T): void {
        const newNode = new DoubleListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return;
        }
        if (this.tail) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    // Insert a new node at the beginning
    prepend(value: T): void {
        const newNode = new DoubleListNode(value);
        newNode.next = this.head;
        if (this.head) {
            this.head.prev = newNode;
        }
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }
    }

    // Print the linked list from head to tail
    printListForward(): void {
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }

    // Print the linked list from tail to head
    printListBackward(): void {
        let current = this.tail;
        while (current) {
            console.log(current.value);
            current = current.prev;
        }
    }
}

```

**Key Operations**

1. **Insertion**: You can insert a new element at the beginning, middle, or end of the list.
2. **Deletion**: You can remove an element from any position in the list.
3. **Traversal**: You can traverse the list to find or operate on elements.
4. **Search**: You can search for an element in the list by traversing from the beginning to the end.

**Advantages**

- Dynamic size
- Efficient insertion and deletion

**Disadvantages**

- No direct access to elements by index
- Requires extra memory for storing pointers

## Trees, Tries, and Graphs

Trees, Tries, and Graphs are fundamental data structures in computer science, each serving unique purposes and applications, from organizing hierarchical data to managing and searching through large datasets efficiently.

- **Trees** are used for hierarchical data representation, with each child node having only one parent, except for the root node, which has none.
- **Tries** are specialized trees used for searching, particularly useful for autocomplete and spell-checking applications due to their efficient prefix-based search capabilities.
- **Graphs** are the most flexible of the three, capable of representing complex networks of relationships without hierarchical restrictions. They're essential in modeling and solving problems in areas like networking, city planning, and social media.

### Trees

A **Tree** is a hierarchical data structure consisting of nodes, where each node contains a value and a list of references to other nodes (the children). The top node is called the root, and nodes with no children are called leaves. Trees are widely used in scenarios like file systems, databases, and more.

```tsx
class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

class BinarySearchTree<T> {
    root: TreeNode<T> | null = null;

    insert(value: T): void {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }
}

```

**Advantages:**

- **Hierarchical Structure**: Trees naturally represent hierarchical data, making them ideal for filesystems, organizational structures, and category hierarchies.
- **Efficient Operations**: Operations like search, insertion, and deletion can be very efficient in balanced trees, often requiring time proportional to the logarithm of the number of items stored in the tree (O(log n)).
- **Sorted Data**: Binary Search Trees (BSTs), for example, maintain their elements in a sorted order, facilitating operations like minimum/maximum value queries, ordered traversal, and range queries.

**Disadvantages:**

- **Balancing**: Some types of trees (like BSTs) can become unbalanced with arbitrary insertions and deletions, degrading to linear performance (O(n)) in the worst case. Balancing trees (like AVL or Red-Black Trees) can mitigate this but add complexity.
- **Space Overhead**: Each node in a tree requires additional storage for pointers (to children, and sometimes to the parent), which can be significant for a large number of nodes.

### Tries

A **Trie**, also known as a prefix tree or digital tree, is a type of search tree used to store a dynamic set or associative array where the keys are usually strings. Tries are invaluable for tasks like autocomplete on search engines or spell checking, enabling fast lookup and insertion operations.

```tsx
class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let current = this.root;
        for (const char of word) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char)!;
        }
        current.isEndOfWord = true;
    }

    search(word: string): boolean {
        let current = this.root;
        for (const char of word) {
            if (!current.children.has(char)) {
                return false;
            }
            current = current.children.get(char)!;
        }
        return current.isEndOfWord;
    }
}

```

**Advantages:**

- **Efficient Prefix Operations**: Tries allow for efficient prefix searching and matching, making them excellent for autocomplete suggestions, dictionary implementations, and prefix-based search applications.
- **Space Efficient for Large Datasets**: While tries initially seem to consume more space, they can be space-efficient for a dataset with many overlapping prefixes, as common prefixes are stored only once.
- **Fast Search, Insert, and Delete**: Operations typically run in O(k) time, where k is the length of the key, independent of the dataset size.

**Disadvantages:**

- **Space Consumption**: Tries can consume more space than other data structures, especially for a small number of long strings with few common prefixes.
- **Complexity**: Implementing a trie can be more complex than simpler structures like lists or binary search trees, especially when it comes to handling deletions and minimizing space usage.

### Graphs

A **Graph** is a collection of nodes (or vertices) and edges connecting pairs of nodes. Graphs can be directed or undirected, weighted or unweighted, and are used to model relationships between objects, like social networks, road maps, and internet connections.

```tsx
class Graph {
    adjacencyList: Map<number, number[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex: number): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1: number, vertex2: number): void {
        this.adjacencyList.get(vertex1)?.push(vertex2);
        this.adjacencyList.get(vertex2)?.push(vertex1); // For an undirected graph
    }

    printGraph(): void {
        for (const [vertex, edges] of this.adjacencyList.entries()) {
            console.log(`${vertex} -> ${edges.join(", ")}`);
        }
    }
}

```

**Advantages:**

- **Flexibility**: Graphs can represent a wide range of relationships and structures, such as social networks, city roads, and web page links, making them extremely versatile.
- **Powerful Algorithms**: Many powerful algorithms exist for graphs, addressing problems like shortest path, connectivity, and cycle detection.
- **Representation of Complex Relationships**: Graphs can easily represent both bidirectional and unidirectional relationships, as well as varied relationship types through weighted edges.

**Disadvantages**

- **Complexity**: Algorithms for graph processing (like searching and finding the shortest path) can be more complex and computationally intensive than algorithms for other data structures.
- **Space Consumption**: Storing a graph with many edges can require significant memory, especially for dense graphs. The choice between an adjacency list and an adjacency matrix can impact both performance and space efficiency.
- **Algorithm Suitability**: Not all algorithms are suitable for all types of graphs. For example, some algorithms only work with directed acyclic graphs (DAGs) or require the graph to be weighted or unweighted.

## Stacks and Queues

Stacks and Queues are fundamental data structures used widely in computer science for managing collections of elements in a particular order. Each has its unique way of handling insertions and deletions, making them suitable for specific kinds of problems.

Both stacks and queues can be implemented using arrays or linked lists. Arrays allow for faster access but have a fixed size, while linked lists provide dynamic sizing at the cost of slightly slower access due to pointer traversal.

- **Stacks** are particularly useful for algorithms involving backtracking (e.g., navigating a maze), parsing expressions (e.g., evaluating infix/postfix expressions), and managing function calls and recursion in programming languages.
- **Queues** are essential for scheduling tasks (e.g., CPU scheduling, IO Buffering), handling asynchronous data (e.g., keystrokes in a GUI application), and breadth-first search algorithms in graph traversal.

Choosing between a stack and a queue—or another data structure entirely—depends on the requirements of the application, especially the order in which elements need to be accessed and processed.

### Stacks

A **Stack** is a linear data structure that follows the Last In, First Out (LIFO) principle. The last element added to the stack is the first one to be removed. You can think of it like a stack of plates; you add or remove the top plate, leaving the others undisturbed.

- **Push**: Add an element to the top of the stack.
- **Pop**: Remove the top element from the stack.
- **Peek** or **Top**: Retrieve the top element of the stack without removing it.

```jsx
class Stack<T> {
    private storage: T[] = [];

    constructor(initialData?: T[]) {
        if (initialData) {
            this.storage = initialData;
        }
    }

    // Add an element to the top of the stack
    push(item: T): void {
        this.storage.push(item);
    }

    // Remove the top element from the stack and return it
    pop(): T | undefined {
        return this.storage.pop();
    }

    // View the top element without removing it
    peek(): T | undefined {
        return this.storage[this.storage.length - 1];
    }

    // Check if the stack is empty
    isEmpty(): boolean {
        return this.storage.length === 0;
    }

    // Get the number of elements in the stack
    size(): number {
        return this.storage.length;
    }

    // Print the stack contents
    print(): void {
        console.log(this.storage);
    }
}

// Example usage
const stack = new Stack<number>();
stack.push(10);
stack.push(20);
stack.push(30);
console.log("Top element:", stack.peek()); // Should show 30
console.log("Stack size before popping:", stack.size()); // Should show 3
console.log("Popped element:", stack.pop()); // Should remove 30
console.log("Stack size after popping:", stack.size()); // Should show 2
stack.print(); // Should print the remaining elements
```

**Advantages:**

- **Simple and Fast**: Operations like push, pop, and peek are very fast (O(1)) because they only involve the top element.
- **Easy to Implement**: Stacks can be easily implemented using arrays or linked lists.
- **Function Calls**: Stacks are used by programming languages for function call management.

**Disadvantages:**

- **Limited Access**: You can only access the top element of a stack, making it unsuitable for situations where you need to access arbitrary elements.
- **Fixed Size**: When implemented using arrays, the size of the stack is fixed and needs to be defined ahead of time, which can lead to either wasted space or stack overflow.

### Queues

A **Queue** is a linear data structure that follows the First In, First Out (FIFO) principle. The first element added to the queue will be the first one to be removed, similar to a queue of people waiting in line.

**Operations**

- **Enqueue**: Add an element to the end of the queue.
- **Dequeue**: Remove the first element from the front of the queue.
- **Front**: Retrieve the first element of the queue without removing it.

```jsx
class QueueNode<T> {
    public value: T;
    public next: QueueNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

class Queue<T> {
    private head: QueueNode<T> | null = null;
    private tail: QueueNode<T> | null = null;

    // Add an element to the end of the queue
    enqueue(item: T): void {
        const newNode = new QueueNode(item);
        if (this.tail) {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        if (!this.head) {
            this.head = newNode;
        }
    }

    // Remove the first element from the front of the queue and return it
    dequeue(): T | null {
        if (!this.head) return null;
        const value = this.head.value;
        this.head = this.head.next;
        if (!this.head) {
            this.tail = null; // If the queue is empty, reset the tail to null
        }
        return value;
    }

    // View the first element without removing it
    front(): T | null {
        return this.head ? this.head.value : null;
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.head === null;
    }

    // Print the queue contents
    print(): void {
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }
}

// Example usage
const queue = new Queue<number>();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log("Front element:", queue.front()); // Should show 10
console.log("Dequeued element:", queue.dequeue()); // Should remove 10
queue.print(); // Should print the remaining elements (20 and 30)
```

**Advantages:**

- **Simple and Predictable**: Queue operations are straightforward, making queues easy to understand and implement.
- **Versatile**: Queues are used in a wide range of applications, from managing tasks in operating systems to handling data packets in networking.
- **Dynamic Size**: When implemented using linked lists, queues can grow and shrink dynamically, avoiding the fixed-size limitation.

**Disadvantages:**

- **Limited Access**: Like stacks, queues only allow access to the element at the front, making them unsuitable for applications requiring random access.
- **Performance**: In some implementations, like when using arrays, enqueue operations can be slow (O(n)) if it involves shifting elements to maintain the queue order.

## Heaps

A **Heap** is a specialized tree-based data structure that satisfies the heap property: in a max heap, for any given node C, if P is a parent node of C, then the key (the value) of P is greater than or equal to the key of C. In a min heap, the key of P is less than or equal to the key of C. The node at the "top" of the heap (the root node) contains the largest key (in a max heap) or the smallest key (in a min heap). Heaps are commonly used to implement priority queues and for efficient sorting algorithms like heapsort.

- **Complete Binary Tree**: A heap is a complete binary tree, which means it is completely filled, except possibly for the bottom level, which is filled from left to right.
- **Efficient Operations**: Insertion and deletion operations can generally be performed in O(log n) time, making heaps efficient for priority queue operations and repeated access to the largest (or smallest) element.

**Types of Heaps**

1. **Max Heap**: The key of each node is always greater than or equal to the keys of its children, and the maximum key is found at the root.
2. **Min Heap**: The key of each node is always less than or equal to the keys of its children, and the minimum key is found at the root.

```jsx
class MinHeap {
    private heap: number[];

    constructor() {
        this.heap = [];
    }

    private getParentIndex(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    private getLeftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }

    private getRightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    private heapifyUp(): void {
        let index = this.heap.length - 1;
        while (this.getParentIndex(index) >= 0 && this.heap[this.getParentIndex(index)] > this.heap[index]) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    private heapifyDown(): void {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.getRightChildIndex(index) < this.heap.length && this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]) {
                smallerChildIndex = this.getRightChildIndex(index);
            }

            if (this.heap[index] < this.heap[smallerChildIndex]) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }

    public insert(key: number): void {
        this.heap.push(key);
        this.heapifyUp();
    }

    public extractMin(): number | null {
        if (this.heap.length === 0) {
            return null;
        }
        if (this.heap.length === 1) {
            return this.heap.pop()!;
        }
        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown();
        return min;
    }

    public peek(): number | null {
        if (this.heap.length === 0) return null;
        return this.heap[0];
    }

    public isEmpty(): boolean {
        return this.heap.length === 0;
    }

    // Additional method to help visualize the heap
    public printHeap(): void {
        console.log(this.heap);
    }
}

// Example usage
const minHeap = new MinHeap();
minHeap.insert(3);
minHeap.insert(1);
minHeap.insert(6);
minHeap.insert(5);
minHeap.insert(2);
minHeap.insert(4);

console.log("Min heap:");
minHeap.printHeap(); // Show the heap

console.log("Extract min:", minHeap.extractMin()); // Should be 1, the smallest element
console.log("Heap after extraction:");
minHeap.printHeap(); // Show the heap after extracting the minimum
```

```jsx
class MinHeap {
    private heap: number[];

    constructor() {
        this.heap = [];
    }

    private getParentIndex(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    private getLeftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }

    private getRightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    private heapifyUp(): void {
        let index = this.heap.length - 1;
        while (this.getParentIndex(index) >= 0 && this.heap[this.getParentIndex(index)] > this.heap[index]) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    private heapifyDown(): void {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.getRightChildIndex(index) < this.heap.length && this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]) {
                smallerChildIndex = this.getRightChildIndex(index);
            }

            if (this.heap[index] < this.heap[smallerChildIndex]) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }

    public insert(key: number): void {
        this.heap.push(key);
        this.heapifyUp();
    }

    public extractMin(): number | null {
        if (this.heap.length === 0) {
            return null;
        }
        if (this.heap.length === 1) {
            return this.heap.pop()!;
        }
        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown();
        return min;
    }

    public peek(): number | null {
        if (this.heap.length === 0) return null;
        return this.heap[0];
    }

    public isEmpty(): boolean {
        return this.heap.length === 0;
    }

    // Additional method to help visualize the heap
    public printHeap(): void {
        console.log(this.heap);
    }
}

// Example usage
const minHeap = new MinHeap();
minHeap.insert(3);
minHeap.insert(1);
minHeap.insert(6);
minHeap.insert(5);
minHeap.insert(2);
minHeap.insert(4);

console.log("Min heap:");
minHeap.printHeap(); // Show the heap

console.log("Extract min:", minHeap.extractMin()); // Should be 1, the smallest element
console.log("Heap after extraction:");
minHeap.printHeap(); // Show the heap after extracting the minimum
```

**Operations:**

- **Insert**: Adding a new key to the heap while maintaining the heap property. This is done by adding the element at the end of the heap and then "heapifying" up.
- **Extract-Max (or Extract-Min)**: Removing and returning the root element of the heap (which is either the maximum or minimum, depending on the type of heap) and then re-establishing the heap property by "heapifying" down from the root.
- **Peek**: Returning the value of the root element without removing it from the heap.

**Advantages:**

- **Efficient Maximum or Minimum Value Access**: Heaps allow for constant-time access to the maximum (in a max heap) or minimum (in a min heap) value held in the data structure.
- **Dynamic**: Unlike static data sorting, heaps provide a way to dynamically insert and delete elements while maintaining order, making them ideal for priority queues where the dataset changes over time.

**Disadvantages:**

- **Fixed Extreme**: Only one of either the maximum or minimum element is directly accessible at any time.
- **No Ordered Traversal**: Unlike binary search trees, heaps do not provide an efficient means to perform an in-order traversal of elements, making them unsuitable for applications requiring sorted data.
- **Complexity**: While basic operations are efficient, understanding and implementing heap operations (especially heapify) can be more complex than simpler data structures.

Heaps are implemented in various programming languages through their standard libraries, often as part of the collection frameworks. For instance, Python has a `heapq` module that provides a simple implementation of a min heap, while C++ offers a `priority_queue` in its Standard Template Library (STL) that acts as a max heap by default.

## Vectors/ArrayLists

Vectors or ArrayLists are dynamic array data structures that grow and shrink automatically, providing a flexible means of handling a collection of elements. While the terms "Vector" and "ArrayList" can be used interchangeably in some contexts, they originate from different programming languages: "Vector" is primarily used in C++ (though Java also has a Vector class), and "ArrayList" is used in Java. Despite their naming differences, both offer similar functionalities and characteristics.

In languages like Java, the `ArrayList` class is part of the standard library, offering a generic implementation that can hold any type of objects. In C++, the `std::vector` template class provides similar functionality, with type safety ensured through templates.

Vectors and ArrayLists are ideal for scenarios where the flexibility of a dynamic array is needed, and operations are primarily focused on adding, removing, and accessing elements based on their index. They are widely used in various applications, from handling collections of objects in software applications to data manipulation in algorithms.

```jsx
class DynamicArray<T> {
    private storage: T[];
    private count: number;

    constructor() {
        this.storage = [];
        this.count = 0;
    }

    // Adds an element to the end of the dynamic array
    add(element: T): void {
        this.storage[this.count] = element;
        this.count++;
    }

    // Inserts an element at the specified index
    insert(index: number, element: T): void {
        if (index < 0 || index > this.count) {
            throw new Error("Index out of bounds");
        }

        for (let i = this.count; i > index; i--) {
            this.storage[i] = this.storage[i - 1];
        }

        this.storage[index] = element;
        this.count++;
    }

    // Removes the element at the specified index
    removeAt(index: number): T {
        if (index < 0 || index >= this.count) {
            throw new Error("Index out of bounds");
        }

        const removedElement = this.storage[index];
        for (let i = index; i < this.count - 1; i++) {
            this.storage[i] = this.storage[i + 1];
        }

        this.count--;
        return removedElement;
    }

    // Returns the element at the specified index
    get(index: number): T {
        if (index < 0 || index >= this.count) {
            throw new Error("Index out of bounds");
        }
        return this.storage[index];
    }

    // Returns the number of elements in the dynamic array
    size(): number {
        return this.count;
    }

    // Prints all elements in the dynamic array
    print(): void {
        for (let i = 0; i < this.count; i++) {
            console.log(this.storage[i]);
        }
    }
}

// Example usage
const dynamicArray = new DynamicArray<number>();
dynamicArray.add(1);
dynamicArray.add(2);
dynamicArray.insert(1, 3); // Insert 3 at index 1
console.log("After insertions:");
dynamicArray.print(); // Should print 1, 3, 2

console.log("Element at index 1:", dynamicArray.get(1)); // Should print 3
console.log("Removed element:", dynamicArray.removeAt(1)); // Should remove and print 3
console.log("After removal:");
dynamicArray.print(); // Should print 1, 2
console.log("Size:", dynamicArray.size()); // Should print 2
```

**Characteristics**

- **Dynamic Resizing**: Unlike static arrays, which have a fixed size, Vectors/ArrayLists can adjust their size at runtime to accommodate more elements or release unused capacity.
- **Contiguous Storage**: Elements are stored in contiguous memory locations, which allows for efficient access and manipulation of elements.
- **Automatic Management**: These data structures handle memory allocation and deallocation internally, simplifying usage and avoiding common memory management errors.

**Operations**

Vectors/ArrayLists support a variety of operations, including:

- **Addition**: Insert an element at the end of the vector or at a specific index.
- **Deletion**: Remove an element from a specific index.
- **Access**: Retrieve the element at a given index.
- **Size**: Obtain the current number of elements stored.
- **Capacity**: Retrieve the current capacity of the vector, which can be larger than the number of elements.

**Advantages**

- **Flexibility and Ease of Use**: Automatically resizing as needed, they are more flexible and easier to use than static arrays.
- **Direct Element Access**: Offers constant-time access (O(1)) to elements by their index, making them efficient for lookup operations.
- **Insertions and Deletions**: Efficient for insertions and deletions at the end of the array, also supporting insertions and deletions at arbitrary positions with variable efficiency.

**Disadvantages**

- **Memory Overhead**: May allocate more memory than actually used to accommodate future growth, leading to memory overhead.
- **Insertions and Deletions at Arbitrary Positions**: While supported, these operations can be less efficient (O(n) in the worst case) because they may require shifting elements to maintain the array's contiguous nature.
- **Contiguous Memory Allocation**: The requirement for contiguous memory space can be a limitation for very large arrays on systems with fragmented memory.

## Hash Tables

Hash tables are a type of data structure that offers fast insertion, deletion, and lookup of key-value pairs. Underlying a hash table is an array used to store the values. A hash function is used to compute an index into the array for a given key, determining where the value should be stored. Because hash functions can lead to different keys being assigned the same index (a situation known as a collision), hash tables need a strategy to handle these collisions effectively.

**Characteristics**

- **Fast Data Retrieval**: Offers average-case constant time complexity (O(1)) for insertions, deletions, and searches, assuming a good hash function and effective collision resolution.
- **Key-Value Mapping**: Stores data as key-value pairs, allowing for fast access to the value associated with a specific key.
- **Dynamic Resizing**: To maintain efficiency, a hash table can dynamically resize based on the number of elements stored, typically doubling in size when a certain load factor is reached.

**Collision Resolution Techniques**

- **Chaining**: Each array index points to a linked list (or another data structure) that holds all the elements hashed to that index.
- **Open Addressing**: All elements are stored within the array itself, and a collision resolution scheme (like linear probing, quadratic probing, or double hashing) is used to find another spot in the array.
    
    ```tsx
    class HashNode<K, V> {
        public key: K;
        public value: V;
        public next: HashNode<K, V> | null = null;
    
        constructor(key: K, value: V) {
            this.key = key;
            this.value = value;
        }
    }
    
    class HashTable<K, V> {
        private buckets: Array<HashNode<K, V> | null>;
        private size: number;
    
        constructor(bucketCount = 20) {
            this.buckets = new Array(bucketCount).fill(null);
            this.size = 0;
        }
    
        private hash(key: K): number {
            const hashCode = Array.from(String(key)).reduce(
                (hash, char) => 31 * hash + char.charCodeAt(0),
                0
            );
            return hashCode % this.buckets.length;
        }
    
        public set(key: K, value: V): void {
            const index = this.hash(key);
            let head = this.buckets[index];
    
            while (head !== null) {
                if (head.key === key) {
                    head.value = value;
                    return;
                }
                head = head.next;
            }
    
            head = this.buckets[index];
            const newNode = new HashNode(key, value);
            newNode.next = head;
            this.buckets[index] = newNode;
            this.size++;
    
            if (this.loadFactor() > 0.7) {
                this.resize();
            }
        }
    
        public get(key: K): V | null {
            const index = this.hash(key);
            let head = this.buckets[index];
    
            while (head !== null) {
                if (head.key === key) {
                    return head.value;
                }
                head = head.next;
            }
    
            return null;
        }
    
        private loadFactor(): number {
            return this.size / this.buckets.length;
        }
    
        private resize(): void {
            const oldBuckets = this.buckets;
            this.buckets = new Array(2 * this.buckets.length).fill(null);
            this.size = 0;
    
            oldBuckets.forEach(head => {
                while (head !== null) {
                    this.set(head.key, head.value);
                    head = head.next;
                }
            });
        }
    }
    
    // Example usage
    const hashTable = new HashTable<string, number>();
    hashTable.set("name", 1);
    hashTable.set("age", 25);
    console.log(hashTable.get("name")); // 1
    console.log(hashTable.get("age")); // 25
    
    ```
    

**Advantages**

- **Efficiency**: For well-distributed hash functions, offers very fast data access.
- **Flexibility**: Can store any type of data as values and use various types as keys (if a suitable hash function exists).

**Disadvantages**

- **Space Complexity**: May consume more memory than a simple array or linked list due to the need for a larger array size to minimize collisions.
- **Hash Function Choice**: The efficiency of a hash table relies heavily on the quality of its hash function.

# Algorithms

## Breadth-first search (BFS)

Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at a selected node (the "root" in the case of trees, or any arbitrary node in graphs) and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. BFS is particularly useful for finding the shortest path on unweighted graphs.

- **Level-by-Level Traversal**: BFS visits nodes level by level, ensuring that all nodes at distance `d` from the source are visited before any node at distance `d+1`.
- **Uses a Queue**: To keep track of the next location to visit, BFS uses a queue data structure. Nodes are dequeued, processed, and their unvisited neighbors are enqueued.
- **Finds Shortest Path**: In unweighted graphs, BFS guarantees the shortest path from the starting node to all other nodes, if such paths exist.

**Steps of the Algorithm**

1. **Start by enqueuing the root node (or the starting node for a graph) and mark it as visited.**
2. **Dequeue a node and examine it.**
    - If the dequeued node is the target node, the search is complete.
    - Otherwise, enqueue any adjacent nodes that haven't been visited yet, marking them as visited.
3. **Repeat step 2 until the queue is empty or the desired node is found.**

```tsx
type Graph = Map<number, number[]>;

class BFS {
    private graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    execute(startNode: number): void {
        const visited: Set<number> = new Set();
        const queue: number[] = [];

        // Start by visiting the startNode
        visited.add(startNode);
        queue.push(startNode);

        while (queue.length > 0) {
            const node = queue.shift(); // Remove the first node from the queue
            console.log(node); // Process the node (e.g., print it)

            // Enqueue all unvisited adjacent nodes
            const neighbors = this.graph.get(node);
            if (neighbors) {
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
        }
    }
}

// Example usage
const graph: Graph = new Map([
    [0, [1, 2]],
    [1, [2]],
    [2, [0, 3]],
    [3, [3]]
]);

const bfs = new BFS(graph);
console.log("BFS starting from node 2:");
bfs.execute(2);

```

In this implementation, `Graph` is defined as a map where each key is a node and its value is an array of adjacent nodes, representing the edges. The `BFS` class takes this graph as input and performs BFS starting from a given node, printing the nodes as they are visited. The use of a `Set` for `visited` nodes ensures that each node is processed only once, and the use of a queue ensures that nodes are processed in the order they are discovered.

## Depth-First Search (DFS)

Depth-First Search (DFS) is a fundamental algorithm used to traverse or search through the tree and graph data structures. It explores as far as possible along each branch before backtracking. This characteristic allows DFS to dive deep into a structure to visit nodes at greater depths with the aim of visiting every node in the graph.

**Characteristics of DFS**

- **Path Exploration**: DFS exhaustively searches all the way down one path before moving to another. It's particularly useful for scenarios where we want to explore all possible paths or check for the existence of a path between two nodes.
- **Stack Utilization**: Internally, DFS uses a stack data structure, either explicitly or implicitly through recursion, to keep track of the vertices to visit next.
- **Applications**: DFS is used in solving puzzles with only one solution, topological sorting, cycle detection in directed graphs, and finding connected components in undirected graphs.

**Steps of the Algorithm**

1. **Start by marking the root (or any arbitrary starting node) as visited.**
2. **Explore an adjacent unvisited node, mark it as visited, and recurse. Continue this process until there are no unvisited adjacent nodes left.**
3. **Backtrack to the previous node to explore other paths and repeat the process for each unvisited node until the entire graph is visited or the specific condition is met.**

```tsx
type Graph = Map<number, number[]>;

class DFS {
    private graph: Graph;
    private visited: Set<number>;

    constructor(graph: Graph) {
        this.graph = graph;
        this.visited = new Set();
    }

    execute(startNode: number): void {
        if (this.visited.has(startNode)) {
            return;
        }

        console.log(startNode);
        this.visited.add(startNode);

        const neighbors = this.graph.get(startNode);
        if (neighbors) {
            for (const neighbor of neighbors) {
                this.execute(neighbor);
            }
        }
    }
}

// Example usage
const graph: Graph = new Map([
    [0, [1, 2]],
    [1, [2]],
    [2, [0, 3]],
    [3, [3]]
]);

const dfs = new DFS(graph);
console.log("DFS starting from node 2:");
dfs.execute(2);

```

In this example, `DFS` is a class that takes a graph and performs depth-first search starting from a specified node. The `Graph` is a map where keys are node identifiers and values are arrays of adjacent node identifiers, representing the graph's edges. The `execute` method recursively explores each vertex and its neighbors, marking each as visited to avoid infinite loops or repeated visits. This method effectively traverses the graph in a depth-first manner, printing out each node as it is visited.

## Binary Search

Binary Search is an efficient algorithm for finding a target value within a sorted array. By repeatedly dividing the search interval in half, binary search reduces the search space to the half in each step, making it much faster than a linear search for large datasets. The condition for binary search to work is that the array must be sorted beforehand.

**Characteristics of Binary Search**

- **Time Complexity**: O(log n), where n is the number of elements in the array. This is because the algorithm divides the search space in half with each step.
- **Space Complexity**: O(1) for the iterative approach and O(log n) for the recursive approach, due to the call stack.
- **Efficiency**: Highly efficient for large datasets compared to linear search, which has a time complexity of O(n).
- **Requirement**: The dataset must be sorted prior to the search.

**How Binary Search Works**

1. **Initialize**: Start with two pointers, one at the beginning of the array (`low`) and one at the end (`high`).
2. **Middle Element**: Find the middle element of the array. If the array has an odd number of elements, there will be one middle element. If the array has an even number of elements, the middle element is arbitrarily chosen as the element on the lower or higher side of the midpoint.
3. **Compare the Target**: Compare the target value with the middle element.
    - If the target value is equal to the middle element, the search is complete.
    - If the target value is less than the middle element, repeat the search on the subarray to the left of the middle element.
    - If the target value is greater than the middle element, repeat the search on the subarray to the right of the middle element.
4. **Repeat** the process until the target value is found or the subarray becomes empty (indicating that the target value is not in the array).

```tsx
function binarySearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const guess = arr[mid];

        if (guess === target) {
            return mid; // Target found
        }
        if (guess > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return -1; // Target not found
}

// Example usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
const target = 9;
const result = binarySearch(sortedArray, target);

console.log(result); // Output will be the index of the target if found, or -1 if not found

```

In this implementation, `binarySearch` is a function that takes a sorted array `arr` and a `target` value to find within the array. It returns the index of the target value if found; otherwise, it returns -1. The function utilizes an iterative approach, adjusting the `low` and `high` pointers based on the comparison between the target value and the current middle element until the target is found or the search space is exhausted.

## Merge Sort

Merge Sort is a classic example of the divide-and-conquer algorithmic paradigm. It is a comparison-based sorting algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. The merge step is crucial and does the actual sorting as it combines the two sorted halves into a single sorted sequence. This algorithm is particularly noted for its predictable performance—O(n log n) in the worst-case scenario—regardless of the initial order of the data.

**Characteristics of Merge Sort**

- **Divide and Conquer**: Merge Sort divides the array into halves recursively until each sub-array contains a single element, then merges those sub-arrays to produce sorted arrays until the entire array is merged back together.
- **Stable Sort**: It maintains the relative order of records with equal keys (i.e., values).
- **Not In-place**: Requires additional space proportional to the size of the input array for the merge process, making it not an in-place sorting algorithm.
- **Complexity**: Offers O(n log n) time complexity in all cases (worst, average, and best), making it highly predictable and reliable.

**Steps of the Algorithm**

1. **Divide**: Split the array into two halves.
2. **Conquer**: Recursively sort each half.
3. **Combine**: Merge the two halves to make one sorted array.

```tsx
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left: number[], right: number[]): number[] {
    let result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Concatenating the remainder of the left and right arrays
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Example usage
const array = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = mergeSort(array);
console.log(sortedArray); // Output: [3, 9, 10, 27, 38, 43, 82]

```

In this TypeScript implementation, `mergeSort` is the recursive function that splits the array, and `merge` is the utility function that does the actual work of merging two sorted arrays into a single sorted array. This merge step is crucial, as it combines the divided arrays in a sorted manner. The algorithm continually divides and merges until the original array is entirely sorted.

## Quick Sort

Quick Sort is a highly efficient sorting algorithm that follows the divide-and-conquer approach. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. This process repeats for each sub-array, working towards the final sorted array. The efficiency of Quick Sort comes from its ability to sort in-place, and its average and best-case time complexity is O(n log n), making it faster than other O(n log n) algorithms like Merge Sort or Heap Sort in many scenarios.

**Characteristics of Quick Sort**

- **Divide and Conquer**: It divides the problem into smaller problems (sub-arrays) and then recursively solves those sub-problems.
- **In-place Sorting**: It requires only a small, constant amount of additional storage space.
- **Unstable Sorting**: The relative order of equal sort items is not preserved.
- **Pivot Selection**: The choice of pivot significantly affects the algorithm's performance. The worst-case time complexity is O(n²), which occurs when the smallest or largest element is always picked as the pivot. However, this is typically avoided in practice by using techniques like choosing a random pivot.

**Steps of the Algorithm**

1. **Pivot Selection**: Select a pivot element from the array. Various techniques exist to choose a pivot, such as picking the first element, the last element, the middle element, or a random element.
2. **Partitioning**: Rearrange the array so that all elements with values less than the pivot come before the pivot, while all elements with values greater than the pivot come after it. After this partitioning, the pivot is in its final position.
3. **Recursion**: Recursively apply the above steps to the sub-array of elements with smaller values and separately to the sub-array of elements with greater values.

```tsx
function quickSort(arr: number[], low: number = 0, high: number = arr.length - 1): number[] {
    if (low < high) {
        const pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);  // Before pi
        quickSort(arr, pi + 1, high); // After pi
    }
    return arr;
}

function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return (i + 1);
}

// Example usage
const array = [10, 80, 30, 90, 40, 50, 70];
const sortedArray = quickSort(array);
console.log(sortedArray);

```

This implementation includes two main functions: `quickSort`, which applies the Quick Sort algorithm, and `partition`, which rearranges the array elements based on the pivot. The `partition` function moves all elements smaller than the pivot to the left of the pivot and all greater elements to the right. Then, `quickSort` is recursively called for the sub-arrays formed by dividing the array at the partition index. The process continues until the entire array is sorted.

# Concepts

## Bit Manipulation

Bit manipulation involves direct control of a computer's individual bits or a group of bits within a byte or larger data structure. It's a powerful technique, often used for low-level programming, such as device drivers, low-level graphics, protocol packet assembly, and optimization of algorithms. This approach takes advantage of the binary system on which all digital data processing is based, allowing for efficient computation and compact storage of data.

**Key Concepts and Operations**

- **Bitwise AND (`&`)**: Returns 1 if both bits are 1, otherwise 0. Often used to clear bits.
- **Bitwise OR (`|`)**: Returns 1 if at least one of the two bits is 1. Used to set bits.
- **Bitwise XOR (`^`)**: Returns 1 only if the bits are different. Useful for flipping bits.
- **Bitwise NOT (`~`)**: Inverts all the bits. Converts 1s to 0s and 0s to 1s.
- **Left Shift (`<<`)**: Shifts the bits to the left, padding with 0s on the right. Effectively multiplies by 2 for each shift.
- **Right Shift (`>>`)**: Shifts the bits to the right. For signed numbers, the sign bit is used to fill the vacated positions (arithmetic right shift), and for unsigned numbers, 0 is used (logical right shift).
- **Zero Fill Right Shift (`>>>`)**: Shifts the bits to the right, padding with 0s, regardless of sign.

**Advantages of Bit Manipulation**

- **Efficiency**: Bitwise operations are among the fastest operations in most programming languages, making them ideal for performance-critical tasks.
- **Compact Representation**: Allows handling data in the smallest possible unit of storage, the bit.
- **Versatility**: Bit manipulation techniques are used in various domains, including cryptography, error detection and correction algorithms, compression algorithms, and more.

```tsx
function bitOperationsExample() {
    let a = 9; // In binary: 1001
    let b = 14; // In binary: 1110

    // Bitwise AND
    console.log(a & b); // 8 (1000)

    // Bitwise OR
    console.log(a | b); // 15 (1111)

    // Bitwise XOR
    console.log(a ^ b); // 7 (0111)

    // Bitwise NOT
    console.log(~a); // -10 (In binary: two's complement of 1001)

    // Left Shift
    console.log(a << 2); // 36 (In binary: 100100)

    // Right Shift
    console.log(b >> 2); // 3 (In binary: 11)

    // Zero Fill Right Shift
    console.log((-b) >>> 2); // 1073741820 (large number due to zero fill)
}

bitOperationsExample();

```

In this example, we perform several bitwise operations on two integers, `a` and `b`. Each operation manipulates the binary representations of these numbers in different ways, showcasing how bit manipulation can be used for efficient computation and data manipulation.

## Memory (Stack vs. Heap)

In computer programming, memory management is crucial for efficiency and performance. Two key concepts in this area are the stack and the heap—different areas of memory used for different types of data storage and access.

- **Lifetime**: Stack memory is automatically managed and tied to the scope of functions. Heap memory is manually controlled and has a flexible lifetime.
- **Size Limitations**: Stack has size limitations, making it unsuitable for large or dynamic data structures. The heap can accommodate large amounts of memory but requires manual management.
- **Use Case**: Use the stack for static memory allocation and the heap for dynamic memory allocation.

### **Stack**

The **stack** is a region of memory that stores temporary variables created by each function (including the main function). It operates on a last-in, first-out basis (LIFO). When a function is called, a block of memory (called a "stack frame") is reserved on the stack for its variables and function calls. When the function exits, this memory is automatically freed.

**Characteristics of the Stack:**

- **Fast Allocation**: Memory allocation and deallocation are done by moving the stack pointer, which is much faster than heap allocation.
- **Automatic Management**: The compiler automatically handles the allocation and deallocation of memory on the stack.
- **Limited Space**: The size of the stack is predetermined and limited, making it unsuitable for large dynamic data storage.
- **Local Variables**: Only local variables and function call data are stored here.

### Heap

The **heap** is a region of memory used for dynamic memory allocation. Unlike the stack, variables allocated on the heap must be manually managed by the programmer (or an automatic garbage collector in languages like Java or Python). Memory on the heap is allocated and freed by explicit function calls (`malloc` or `free` in C, `new` or `delete` in C++, or automatic garbage collection in languages like Python and Java).

**Characteristics of the Heap:**

- **Dynamic Allocation**: The heap is used for dynamic memory allocation, where the size of the memory needed isn’t known at compile time.
- **Manual Management**: The programmer is responsible for allocating and deallocating memory, which can lead to errors like memory leaks and dangling pointers if not handled correctly.
- **Slower Allocation**: Compared to stack allocation, heap allocation is slower due to the need to manage free memory blocks.
- **Large and Flexible**: The heap can accommodate much larger data than the stack and can grow dynamically as needed at runtime.

Consider a simple scenario in C++:

```cpp
int main() {
    int stackVar = 0; // Allocated on the stack
    int* heapVar = new int; // Allocated on the heap

    *heapVar = 10; // Accessing heap memory

    delete heapVar; // Freeing heap memory
    return 0;
}

```

In this example, `stackVar` is an integer variable allocated on the stack, with its lifetime automatically managed by the scope of the `main` function. Conversely, `heapVar` points to an integer allocated on the heap, requiring manual allocation with `new` and deallocation with `delete` to avoid memory leaks.

In JavaScript and TypeScript, the distinction between stack and heap memory management is abstracted away from the developer, unlike in lower-level languages like C or C++. The JavaScript runtime environment (V8 in Chrome, SpiderMonkey in Firefox, etc.) automatically manages memory allocation and garbage collection. However, understanding the underlying concepts can still be useful, especially when it comes to performance optimization and memory usage patterns.

Variables containing primitive data types (e.g., numbers, strings, booleans) are typically stored on the stack, while objects, arrays, and functions are stored on the heap because they are dynamically sized.

```tsx
// Stack memory allocation
let number: number = 10; // Primitive stored on the stack
let isAvailable: boolean = true; // Primitive stored on the stack

// Heap memory allocation
let objectOnHeap = { name: "John", age: 30 }; // Object stored on the heap
let arrayOnHeap = [1, 2, 3, 4, 5]; // Array stored on the heap

function add(a: number, b: number): number {
    let sum = a + b; // `sum` is a primitive stored on the stack
    return sum;
}

// Function execution context (its call stack frame)
let result = add(number, 20);

```

In this TypeScript example:

- **Primitive types** (`number`, `boolean`) are allocated on the **stack**. They have a fixed size and their memory is automatically managed.
- **Objects** and **arrays** are stored on the **heap** because they can grow dynamically. Even though memory management is abstracted away in TypeScript/JavaScript, understanding that these types are heap-allocated can help developers reason about memory usage and performance implications.
- When the function `add` is called, a new frame is pushed onto the call stack with the function's local variables. Once the function execution is complete, its frame is popped off the call stack, and the local variables are discarded (their memory is freed).

While TypeScript developers don't manually manage memory (no manual allocation or deallocation like `malloc`, `free`, `new`, or `delete` in C/C++), being aware of these concepts is beneficial, especially for debugging performance issues related to memory usage. Memory leaks in a TypeScript application usually occur due to unintended references that prevent the garbage collector from freeing heap-allocated memory no longer in use.

## Recursion

Recursion is a programming technique where a function calls itself directly or indirectly to solve a problem by breaking it down into smaller, more manageable sub-problems of the same type. It's a powerful concept used in sorting algorithms (like quicksort and mergesort), navigating complex data structures (like trees and graphs), and solving problems that have naturally recursive solutions (like the Fibonacci sequence or factorial calculation).

- **Base Case**: Every recursive function must have a base case that stops the recursion. Without a base case, the recursion would continue indefinitely, eventually leading to a stack overflow error.
- **Recursive Case**: The part of the function where the recursion occurs. The recursive case must alter the input (e.g., by moving towards the base case) to ensure that the recursion progresses towards termination.
- **Call Stack**: Recursive calls are placed on the call stack—a LIFO (Last In, First Out) structure—where each call has its own execution context. When a base case is reached, the stack starts to unwind as the functions complete and return their values.

**Advantages of Recursion**

- **Simplicity**: Recursion can simplify the code for solving complex problems by breaking them down into simpler sub-problems.
- **Applicability**: Particularly suited for tasks that can naturally be divided into identical subtasks, such as traversing tree structures.

**Disadvantages of Recursion**

- **Performance Overhead**: Each recursive call adds a new layer to the call stack, which can lead to significant memory usage and potentially a stack overflow error for deep recursion.
- **Efficiency**: Recursive algorithms can be less efficient than their iterative counterparts due to the overhead of multiple function calls.

```tsx
function factorial(n: number): number {
    // Base case: factorial of 0 or 1 is 1
    if (n === 0 || n === 1) {
        return 1;
    }

    // Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1);
}

// Example usage
console.log(factorial(5)); // Outputs: 120

```

In this example, the `factorial` function calls itself with `n - 1` until it reaches the base case (`n === 0` or `n === 1`), at which point it starts returning and unwinding the call stack. Each function call waits for the result of its recursive call, multiplying that result by `n` until the original call returns the final factorial value.

Recursion is a fundamental concept in computer science, enabling elegant solutions to complex problems. However, it's essential to use it judiciously to avoid performance pitfalls, especially in languages or scenarios where the call stack size is limited.

## Dynamic Programming

Dynamic Programming (DP) is a method for solving complex problems by breaking them down into simpler subproblems. It's a technique that combines the efficiency of recursion with the thoroughness of brute force by caching (memoizing) intermediate results. This approach ensures that each subproblem is solved only once, thus significantly reducing the computation time compared to naive recursive approaches that solve the same subproblems repeatedly.

- **Optimal Substructure**: A problem exhibits optimal substructure if its optimal solution can be constructed efficiently from optimal solutions of its subproblems. This is a prerequisite for applying DP.
- **Overlapping Subproblems**: DP is applicable when the problem can be broken down into subproblems that are reused multiple times.
- **Memoization**: Storing the results of expensive function calls and returning the cached result when the same inputs occur again.
- **Tabulation (Bottom-Up Approach)**: Solving the problem by building up a table of solutions to larger and larger instances of the same subproblem.

**Advantages of Dynamic Programming**

- **Efficiency**: Significantly reduces the time complexity of brute force recursive solutions from exponential to polynomial for many problems.
- **Systematic Approach**: Provides a structured methodology to solve complex problems by breaking them down into simpler steps.

**Disadvantages of Dynamic Programming**

- **Memory Usage**: Storing the solutions to subproblems can consume significant memory, especially for problems with a large state space.
- **Problem-Specific**: Not all problems can be effectively solved with dynamic programming. Identifying the applicability of DP requires understanding the problem's structure.

**Example in TypeScript: Fibonacci Sequence**

The Fibonacci sequence is a classic example demonstrating both the overlapping subproblems and optimal substructure properties, making it suitable for dynamic programming.

**Naive Recursive Approach**

```tsx
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

```

The naive recursive approach leads to exponential time complexity due to redundant calculations.

**Dynamic Programming Approach with Memoization**

```tsx
function fibonacciDP(n: number, memo: Record<number, number> = {}): number {
    if (n in memo) return memo[n]; // Return memoized value if available
    if (n <= 1) return n; // Base cases

    memo[n] = fibonacciDP(n - 1, memo) + fibonacciDP(n - 2, memo); // Memoize and return
    return memo[n];
}

```

In the DP approach, each Fibonacci number is calculated once, stored in a memo object, and reused, reducing the time complexity to linear.

**Dynamic Programming Strategy**

To solve a problem using dynamic programming, follow these steps:

1. **Characterize the Structure of an Optimal Solution**: Identify how to construct an optimal solution from optimal solutions of its subproblems.
2. **Define the Value of an Optimal Solution**: Formally define the value of the solution in terms of its subproblems.
3. **Compute the Value of an Optimal Solution**: Typically, this is done recursively and involves memoization or tabulation.
4. **Construct an Optimal Solution**: Once the values of the subproblems have been computed, use them to build the solution to the original problem.

Dynamic Programming is a powerful tool in the algorithm designer's toolkit, providing efficient solutions to a range of problems that would otherwise be intractable.

## Big O Time & Space

Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it's widely used to describe the performance or complexity of an algorithm, specifically focusing on the worst-case scenario. Big O notation provides a high-level understanding of the time (execution time) and space (memory usage) requirements of an algorithm as the size of the input data increases.

**Big O Time Complexity**

Time complexity measures how the execution time of an algorithm changes with the size of the input data set. It gives an idea of the growth rate of an algorithm's running time. Here are some common time complexities, listed from fastest to slowest growing:

- **O(1)**: Constant time - The execution time remains the same, regardless of the input size.
- **O(log n)**: Logarithmic time - The execution time grows logarithmically as the input size increases. Binary search is a classic example.
- **O(n)**: Linear time - The execution time grows linearly with the input size.
- **O(n log n)**: Log-linear time - Often seen in efficient sorting algorithms like mergesort and heapsort.
- **O(n^2)**: Quadratic time - Seen in simple sorting algorithms like bubble sort and insertion sort.
- **O(2^n)**: Exponential time - The execution time doubles with each addition to the input data set. Many recursive algorithms have exponential time complexity.
- **O(n!)**: Factorial time - The execution time grows factorially with the input size. Seen in algorithms that generate all possible permutations of a set.

**Big O Space Complexity**

Space complexity measures the total amount of memory an algorithm needs to run to completion as a function of the length of the input. Like time complexity, it’s often expressed using Big O notation:

- **O(1)**: Constant space - The algorithm requires the same amount of space regardless of the input size.
- **O(log n)**: Logarithmic space - Rare in practice, but it indicates that the space grows logarithmically with the input size.
- **O(n)**: Linear space - The space required grows linearly with the input size. This is common with algorithms that require proportional space to the input.
- **O(n^2)**: Quadratic space - The space required grows quadratically with the input size. This can happen with algorithms that need to store all pairs of elements in memory.

**Importance of Big O**

Understanding the Big O complexity of algorithms is crucial for several reasons:

- **Predicting Performance**: It helps predict how algorithms scale and perform as data volume increases, which is essential for high-performance applications.
- **Comparing Algorithms**: Big O provides a way to compare the efficiency of different algorithms and select the most appropriate one for the current context.
- **Resource Allocation**: It aids in understanding the resource requirements of algorithms, which is vital for system design and architecture.

```tsx
// Function that calculates the sum of all numbers up to n:

// O(n) - Linear time complexity
function sumLinear(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// O(1) - Constant time complexity
function sumConstant(n: number): number {
    return n * (n + 1) / 2;
}

```

`sumLinear` has a linear time complexity (O(n)) because it iterates over each number up to `n`, making the execution time increase linearly with `n`. On the other hand, `sumConstant` calculates the sum in constant time (O(1)) regardless of the input size, as it uses a mathematical formula without iterations.

Understanding and applying Big O notation is fundamental for developing efficient algorithms, optimizing existing solutions, and effectively communicating the complexity and performance characteristics of algorithms.

### Calculating Time Complexity

Calculating time complexity, especially using Big O notation, might seem daunting at first, but it can be approached systematically. Let's break it down into simple, beginner-friendly steps with code examples to make it clearer.

**Step 1: Understand What You're Measuring**

The time complexity of an algorithm is a way to describe how its runtime increases as the size of the input data (often denoted as `n`) increases. You're essentially looking for the "growth rate" of the algorithm's execution time.

**Step 2: Identify the Basic Operations**

Look for the operations in your algorithm that are executed most frequently. These could be arithmetic operations, comparisons, or loops. The time complexity is primarily determined by how many times these operations are executed in relation to the input size `n`.

Basic Example: Constant Time Complexity O(1)

```tsx
function isFirstElementNull(elements: any[]): boolean {
    return elements[0] === null;
}

```

- **Analysis**: No matter how large the input array is, this function checks only the first element. The number of operations does not depend on the size of the input.
- **Conclusion**: The time complexity is O(1), or constant time.

**Step 3: Count the Operations as a Function of Input Size**

When an operation's frequency can be directly tied to the input size, count how it scales as `n` increases.

Basic Example: Linear Time Complexity O(n)

```tsx
function findMax(elements: number[]): number {
    let max = elements[0];
    for (let i = 1; i < elements.length; i++) {
        if (elements[i] > max) {
            max = elements[i];
        }
    }
    return max;
}

```

- **Analysis**: The loop runs once for each element in the array, so if the array has `n` elements, the loop runs `n` times.
- **Conclusion**: The time complexity is O(n), or linear time.

**Step 4: Consider Nested Operations**

If your algorithm contains nested loops or recursive calls, the inner operations are multiplicative based on the levels of nesting.

Basic Example: Quadratic Time Complexity O(n^2)

```tsx
function containsDuplicate(elements: number[]): boolean {
    for (let i = 0; i < elements.length; i++) {
        for (let j = i + 1; j < elements.length; j++) {
            if (elements[i] === elements[j]) {
                return true;
            }
        }
    }
    return false;
}

```

- **Analysis**: For each element in the array, the inner loop compares it against all following elements. The number of comparisons for `n` elements is roughly `n * (n-1) / 2`, which simplifies to O(n^2).
- **Conclusion**: The time complexity is O(n^2), or quadratic time.

**Step 5: Drop Constants and Non-Dominant Terms**

When expressing time complexity, constants and less significant terms are omitted since they don't significantly affect the growth rate at scale.

- **For example**, if your operation count is `2n + 10`, you'd still express the time complexity as O(n), because as `n` becomes very large, the constant 10 and the multiplier 2 become less significant.

**Step 6: Simplify to Big O Notation**

Finally, express your analysis in Big O notation, focusing on the most significant term that describes the growth rate.
