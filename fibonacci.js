function fib(nth_term) {
    if (nth_term < 2 ) return 1
    return fib(nth_term-1) + fib(nth_term-2)
}

let term = fib(7);

console.log(term);