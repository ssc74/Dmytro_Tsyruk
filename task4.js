function pairs_sum(arr, target){ 
    let count = 0; 
    for(let a of arr){ 
        for(let b of arr){ 
            if(arr.indexOf(a) === arr.indexOf(b)){ 
                continue 
            } 
            if(a + b === target){ 
                count++  
            } 
        } 
    } 
    return count/2 
} 

console.log(pairs_sum([1, 3, 6, 2, 2, 0, 4, 5], 5)) // 4
