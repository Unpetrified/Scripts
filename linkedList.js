class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    // show first element of linked list
    peakHead() {
        return this.head.value
    }

    // show last element of linked list
    peakTail() {
        return this.tail.value
    }

    // return true if the node is in the list else return false
    contains(node) {
        let contains = false,
            current_node = this.head;

        while (current_node !== null) {
            if (current_node.value === node) {
                contains = true;
                break
            }
            current_node = current_node.next;
        }

        return contains
    }

    // append node at end of linked list
    push(node) {
        let newNode = new Node(node);

        if (this.length === 0) {
            this.head = newNode;
        } else {
            let current_last_element = this.tail;
            current_last_element.next = newNode;
            newNode.prev = current_last_element;
        }

        this.tail = newNode;
        this.length++;
    }

    // remove node at end of linked list and return it or return null if list is empty
    pop() {
        
        if (this.length === 0) return null

        let last_element = this.tail;

        if (this.length === 1) {
            this.tail = null;
            this.head = null;
            return last_element;
        }

        let second_to_last_element = last_element.prev;

        second_to_last_element.next = null;
        this.tail = second_to_last_element;
        this.length--;

        return last_element.value
    }

    // append node at begining of linked list
    unshift(node) {
        let newNode = new Node(node);

        if (this.length === 0 ) {
            this.tail = newNode;
        } else {
            let current_head_node = this.head;
            current_head_node.prev = newNode;
            newNode.next = current_head_node;
        }

        this.head = newNode;

        this.length++;
    }

    // remove node at begining of linked list and return it or return null if list is empty
    shift() {
        if (this.length === 0 ) return null

        let current_head_node = this.head;
        
        if (this.length === 1) {
            this.tail = null;
            this.head = null;
            return current_head_node;
        }

        let next_element_to_head = current_head_node.next;

        next_element_to_head.prev = null;
        this.head = next_element_to_head;
        this.length--;

        return current_head_node.value
    }

    // return index of node in the argument or null if not in list
    index(node) {
        let i = 0,
            current_node = this.head;

        while (current_node !== null) {

            if (current_node.value === node) {
                return i
                break
            }
            current_node = current_node.next;
            i++
        }

        return null
    }

    // return node at the given index or null if error
    at(index) {
        if (index < 0) return null;

        let current_node = this.head,
            i = 0;

        while (current_node !== null) {

            if (i === index) {
                return current_node.value;
            }

            i++;
            current_node = current_node.next;
        }

        return null
    }

    // Add node at the provided index
    pushAt(node, index) {
        
        if (typeof(index) !== "number") return
        
        index = Math.round(index);

        if (index <= 0) {
            this.unshift(node);
            return
        }

        let newNode = new Node(node),
            i = 0,
            current_node = this.head;
        
        while (current_node !== null) {

            if (i === index) {
                current_node.prev.next = newNode;
                newNode.prev = current_node.prev;
                current_node.prev = newNode;
                newNode.next = current_node;
                
                return
            }
            current_node = current_node.next;
            i++;
        }

        this.push(node)

    }

    // remove node in the provided index and return it or return null if not in list
    remove(index) {
        if (index < 0 || index > this.length) return

        if (index === 0 ) {
            this.shift();
            return
        } else if (index === this.length - 1) {
            this.pop();
            return
        }
     
        let i = 0,
            current_node = this.head;
        
        while (current_node !== null) {

            if (i === index) {
                current_node.prev.next = current_node.next;
                current_node.next.prev = current_node.prev;
                current_node.next = null;
                current_node.prev = null;
                break
            }

            current_node = current_node.next;
            i++;
        }

        this.length--;

    }

    // show all the element contained in the linked list
    show() {
        if (this.length === 0) return "[]"

        let stringified_list = "[ ",
            current_node = this.head;

        while (current_node !== null) {
            stringified_list += current_node.value + " -> ";
            current_node = current_node.next;
        }
        
        stringified_list += null +" ]"

        return stringified_list;
    }

}
