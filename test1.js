const _ = require('lodash')

const data = []
const fomula = ['+', '-', '*', '/']

//Cell { key, value }
function Cell(key, value) {
    return {key: key, value: value}    
}

// init input
let cell1 = new Cell('A1', '6');
let cell2 = new Cell('A2', 'A1 5 *')
let cell3 = new Cell('B1', 'B2 2 +')
let cell4 = new Cell('B2', '9')
let cell5 = new Cell('B3', 'B1 2 +')

data.push(cell1)
data.push(cell2)
data.push(cell3)
data.push(cell4)
data.push(cell5)


// caculate postfix
const postfix = (arr) => {
    const arrayOperants = [];
    arr.forEach(x => {
        if ( x === '*' || x === '+' || x === '/' || x === '-' ) {
           let x1 = parseFloat(arrayOperants.pop());
           let x2 = parseFloat(arrayOperants.pop());
           if(x === '*') {
               arrayOperants.push(x1 * x2)
           }
           else if(x === '+') {
               arrayOperants.push(x1 + x2)
           }
           else if(x === '-') {
               arrayOperants.push(x1 - x2)
           } else if(x === '/') {
               arrayOperants.push(x1 / x2)
           }
        }
        else {
           arrayOperants.push(x);
       }
   })
   return arrayOperants;
}

// recursiveCell
const recursiveCell = (origin, item) => {
    if(!isNaN(item.value)) return item;
    const expression = item.value.split(' ')
    for (let i = 0; i < expression.length; i++) {
        const element = expression[i];
        if(isNaN(element) && !fomula.includes(element)){
            let cell = _.find(origin, c => c.key == element)
            expression[i] = recursiveCell(origin, cell).value
        }
    }

    item.value = (postfix(expression)[0].toString());
    return item;
}

// output
let result = _.map(data, item =>{   
    if(!isNaN(item.value)) return item;

    return recursiveCell(data, item);
})


console.log( 'result: ', result);


