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
            
            if(node === null) return "Node not in tree"

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

    #recursivePreOrder(stack, callback) {
        let top_node = stack.pop();
    
        if(top_node === null) return;

        top_node = top_node.value;

        callback(top_node);

        if(top_node.right !== null) {
            stack.push(top_node.right);
        }

        if(top_node.left !== null) {
            stack.push(top_node.left);
        }

        this.#recursivePreOrder(stack, callback)
    }

    preOrder(callback) {

        this.#checkCallback(callback);

        let stack = new Stack(),
            node = this.root;

        if(node !== null) stack.push(node);

        this.#recursivePreOrder(stack, callback);
    }

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null || node === undefined) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

let tree = new Tree([1,4, 9, 2, 5, 6, 0, 43, 55, 23, 3, 61]);

prettyPrint(tree.root);
tree.delete(4);
tree.delete(5);
tree.delete(2);
prettyPrint(tree.root);