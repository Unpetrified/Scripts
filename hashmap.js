class HashNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap {
    constructor() {
        this.capacity = 16;
        this.load_factor = 0.75;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    // takes the key and hashes it returning an index b/w 0 and capacity - 1
    #hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
        }

        return hashCode;
    }

    #insertNewNode(current_node, key, value) {

        while(current_node !== null) {

            if (current_node.key === key) { //update node
                current_node.value = value;
                break
            }

            if (current_node.next === null) { //insert new node
                let new_hash_node = new HashNode(key, value);
                current_node.next = new_hash_node;
                break
            }

            current_node = current_node.next;
        }
    }

    #updateBucketCap() {
        if((this.capacity * this.load_factor) < this.size) { //hash map is getting full
            let old_hash_map = this.buckets;
            
            this.capacity *= 2; //double map capacity

            let new_hash_map = new Array(this.capacity).fill(null);

            // rehash and copy old hash map into the new one
            for (let i = 0; i < old_hash_map.length; i++) {

                const current_hash_linked_list = old_hash_map[i]; 

                if (current_hash_linked_list === null) continue;

                let current_node = current_hash_linked_list;

                while (current_node !== null) {

                    let new_index = this.#hash(current_node.key);
                    
                    if (new_hash_map[new_index] === null) { //bucket is empty
                        new_hash_map[new_index] = current_node;                        
                    } else {
                        //append subsequent nodes to tail of linked list in bucket
                        this.#insertNewNode(new_hash_map[new_index], current_node.key, current_node.value); 
                    }
                    
                    current_node = current_node.next;
                }
            }

            this.buckets = new_hash_map;
        }
    }

    // if key already exists, overwrite with new value. If bucket is not empty 
    // and keys are not thesame, add pair as next item on the linked list
    set(key, value) {

        this.#updateBucketCap(); //check bucket capcity and update if necessay

        let index = this.#hash(key);
        
        let new_hash_node = new HashNode(key, value);

        if (this.buckets[index] === null) { //bucket is empty
            this.buckets[index] = new_hash_node;
            this.size++;
            return
        }

        let current_node = this.buckets[index];

        this.#insertNewNode(current_node, key, value); 
        
        this.size++;
    }
    
    // retrieve value at key or return null if it doesnt exist
    get(key) {

    }

    // check if key exists in hashmap
    has(key) {

    }

    // remove entry with key from hashmap and return it or return null if it does not exist
    remove(key) {

    }

    // return the number of keys in the hashmap
    length() {
        
    }

    // remove everything in the hashmap
    clear() {

    }

    // return an array containing all the keys in the hashmap
    keys() {

    }

    // return an array containing all the values in the hashmap
    values() {

    }

    // return an array of arrays with each sub array containing all the key, value 
    // pairs in the hashmap
    entries() {

    }
}


const test = new HashMap() // or HashMap() if using a factory

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
