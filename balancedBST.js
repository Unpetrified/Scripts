import mergeSort from "./mergeSort.js";
import Stack from "./stack.js";

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.#buildTree(mergeSort(arr));
    }

    #buildTree(array) {
        if (array.length === 0) return null
        if (array.length === 1) {
            let leaf = new Node(array[0]);
            return leaf
        };

        let mid_index = Math.floor((array.length-1)/2),
            root = new Node(array[mid_index]);

        root.left = this.#buildTree(array.slice(0, mid_index));
        root.right = this.#buildTree(array.slice(mid_index+1));

        return root
    }

    insert(value) {
        let current_node = this.root,
            insertNode = new Node(value);

        while (true) {
            if (insertNode.value === current_node.value) return

            if (insertNode.value > current_node.value) {
                if (current_node.right === null) {
                    current_node.right = insertNode;
                    return
                }
                current_node = current_node.right
            } else {
                if (current_node.left === null) {
                    current_node.left = insertNode;
                    return
                }
                current_node = current_node.left 
            }
        }
    }

    //return the inorder successor of the passed node
    #getSuccessor(node) {

        node = node.right;
        
        while (true) {
            if (node.left === null) break
            
            node = node.left;
        }

        return node;
    }
    
    delete(del_node_value, root=this.root) {
        
        // Base case
        if (root === null) {
            console.log("Key not found");
            return
        }

        if (del_node_value === root.value) {

            // when delete node has one or no children
            if (root.right === null) {
                return root.left
            } else if (root.left === null) {
                return root.right
            }

            //when delete node has two children
            //find the inorder successor (leftmost node in the right subtree)

            let inorderSuccessor = this.#getSuccessor(root);
            root.value = inorderSuccessor.value;
            root.right = this.delete(inorderSuccessor.value, root.right);
        }
    
        if (root.value > del_node_value) { //key is in left subtree
            root.left = this.delete(del_node_value, root.left);
        } else if (root.value < del_node_value) { //key is in right subtree
            root.right = this.delete(del_node_value, root.right);
        } 

        return root
    }

    find(value) {
        let node = this.root;

        while(true) {
            
            if(node === null) return node

            if(node.value === value) return node

            value > node.value ? node = node.right : node = node.left;

        }
    }

    #recursiveCallLevelOrder(queue, callback) {
        let top_node = queue.shift();
    
        if(top_node === undefined) return

        callback(top_node)

        if(top_node.left !== null) {
            queue.push(top_node.left);
        }
        if(top_node.right !== null) {
            queue.push(top_node.right);
        }
        this.#recursiveCallLevelOrder(queue, callback)
    }

    #checkCallback(callback) {
        if(typeof(callback) !== "function") {
            throw new Error(`A function was expected but ${typeof(callback)} was provided instead`);
        }
    }

    levelOrder(callback) {
        
        this.#checkCallback(callback)

        let queue = [],
            node = this.root;
        
        if(node !== null) queue.push(node);

        this.#recursiveCallLevelOrder(queue, callback)
    }

    inOrder(callback, root=this.root) {
        if(root === null || root === undefined) return
        this.inOrder(callback, root.left);
        callback(root);
        this.inOrder(callback, root.right);
    }

    preOrder(callback, root=this.root) {
        if(root === null) return
        callback(root);
        this.inOrder(callback, root.left);
        this.inOrder(callback, root.right);
    }

    postOrder(callback, root=this.root) {
        if(root === null) return
        this.inOrder(callback, root.left);
        this.inOrder(callback, root.right);
        callback(root);
    }

    depth(node_value) {
        let depth = 0,
            node = this.root;

        while(true) {
            if (node === null) return "Node not in tree";

            if(node.value === node_value) return depth

            if(node.value > node_value) {
                node = node.left;
                depth++;
                continue;
            }

            if(node.value < node_value) {
                node = node.right;
                depth++;
                continue;
            }
        }

    }

    #traverse(root, counter, original, heighest) {
        if (root === null) {
            return 0
        }
        counter++;
        let heighest_left = this.#traverse(root.left, counter, original, heighest);
        let heighest_right = this.#traverse(root.right, counter, original, heighest);
        if (counter > heighest) {
            heighest = counter
            if (heighest_left > counter) heighest = heighest_left
            if (heighest_right > counter) heighest = heighest_right
        };
        
        return heighest
    }

    height(node) {
        let root = this.find(node);

        if (root === null) return null

        let node_height = this.#traverse(root, 0, root.value, 0)-1;
        
        return node_height
    }

    #checkHeight(node) {
        
        if (node === null || node === undefined) return 0
        
        let left_subtree_height = this.#checkHeight(node.left);
        if (left_subtree_height === -1) return -1;

        let right_subtree_height = this.#checkHeight(node.right);
        if (right_subtree_height === -1) return -1;

        if (Math.abs(left_subtree_height-right_subtree_height) > 1) return -1

        return (Math.max(left_subtree_height, right_subtree_height) + 1);
    }

    isBalanced() {
        return (this.#checkHeight(this.root) !== -1) ? true : false
    }

    reBalance() {
        let arr = [];
        this.inOrder(node => {
            arr.push(node.value);
        }, this.root);
        this.root = this.#buildTree(arr);
    }

}