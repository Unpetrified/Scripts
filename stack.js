class StackNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export default class Stack {
    constructor() {
        this.head = null
    }

    push(value) {
        let stackNode = new StackNode(value);
        stackNode.next = this.head;
        this.head = stackNode;
    }

    pop() {
        let node = this.head;
        if(this.head !== null) this.head = this.head.next;
        return node
    }

    list() {
        let list = [],
            node = this.head;
        while(true) {
            if(node === null) break
            list.push(node.value)
            node = node.next;
        }
        return list
    }
}