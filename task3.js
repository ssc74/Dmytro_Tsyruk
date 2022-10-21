function digital_root(num) {  
   let sum = num  
   let arr = []  
   let reducer = (a,b) => parseInt(a) + parseInt(b)  
   while (sum > 9) {  
      arr = sum.toString().split("")  
      sum = arr.reduce(reducer)  
   }  
   return sum  
}  
  
console.log(digital_root(16)) // 7  
console.log(digital_root(132189)) // 6  
console.log(digital_root(493193)) // 2 
