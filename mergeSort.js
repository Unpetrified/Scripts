export default function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
  
    return merge(left, right);
  }
  
  function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;
  
    while (i < left.length && j < right.length) {

      // remove duplicates
      if(left[i] === result[result.length-1]) {
          i++;
          continue

      } else if(right[j] === result[result.length-1]) {
        j++;
        continue
      }

      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
  
    // Add remaining elements from either array
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
