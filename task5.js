function sort_friends(str){ 
    return str.split(";").map(a => {let b = a.split(":"); 
    return `(${b[1]}, ${b[0]})`}).sort().join(" ")
} 
     
console.log(sort_friends("Fired:Corwill;Wilfred:Corwill;Barney:TornBull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill")) // "(Corwill,Alfred)(Corwill,Fired)(Corwill,Raphael)(Corwill,Wilfred)(Tornbull,Betty)(Tornbull,Bjon)(TornBull,Barney)"
