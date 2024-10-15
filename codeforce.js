let input = prompt("Enter Limak's and Bob's weights separated by a space:");
let [a, b] = input.split(" ").map(Number);

function yearsToBecomeLarger(a, b) {
    let years = 0;
    
    while (a <= b) {
        a *= 3;
        b *= 2;
        years++;
    }
    
    return years;
}

console.log(yearsToBecomeLarger(a, b));
