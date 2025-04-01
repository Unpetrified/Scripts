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

let s = new Stack();
s.push(12);
s.push(1);
s.push(2);
s.push(10);
s.push(11);
s.push(16);
s.push(4);
s.push(7);
s.push(3);
s.push(9);
s.push(0);
s.push(19);
s.pop();
s.pop();
let all = s.list();
console.log(all);
