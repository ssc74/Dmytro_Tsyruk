function first_non_repeating_letter(str){  
    for(s of str){  
        if(str.toUpperCase().split(s.toUpperCase()).length -1 == 1) return s  
    }  
    return ""  
}  
  
console.log(first_non_repeating_letter('stress')) // 't'  
console.log(first_non_repeating_letter('sTreSS')) // 'T' 
