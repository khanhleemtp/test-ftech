const _ = require('lodash')

const data = []
const fomula = ['+', '-', '*', '/']


//Cell { key, value }
function Cell(key, value) {
    return {key: key, value: value}    
}

// init input
let cell1 = new Cell('A1', '6');
let cell2 = new Cell('A2', 'A1 5 * B2 7 * + 2 *')
let cell3 = new Cell('B4', 'B2 2 + A2 - 5 *')
let cell4 = new Cell('B2', '9 3 / 6 + 4 * 2 +')
let cell5 = new Cell('B3', 'B4 2 + A2 * 5')

data.push(cell1)
data.push(cell2)
data.push(cell3)
data.push(cell4)
data.push(cell5)

console.log('input', data);


// sort 

// regex
const reA = /[^a-zA-Z]/;
const reN = /[^0-9]/;

function sortAlphaNum(a, b) {
  const aA = a.replace(reA, "");
  const bA = b.replace(reA, "");
  if (aA === bA) {
    const aN = parseInt(a.replace(reN, ""), 10);
    const bN = parseInt(b.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    return aA > bA ? 1 : -1;
  }
}


// caculate postfix
const postfix = (arr) => {
    const arrayOperants = [];
    arr.forEach(x => {
        if ( x === '*' || x === '+' || x === '/' || x === '-' ) {
           let x1 = parseFloat(arrayOperants.pop());
           let x2 = parseFloat(arrayOperants.pop());
           if(x === '*') {
               arrayOperants.push(x2 * x1)
           }
           else if(x === '+') {
               arrayOperants.push(x2 + x1)
           }
           else if(x === '-') {
               arrayOperants.push(x2 - x1)
           } else if(x === '/') {
               arrayOperants.push(x2 / x1)
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
const ouput = [];

let result = _.map(data, item =>{   
    if(!isNaN(item.value)) return item;
    return recursiveCell(data, item);
})

// console.log( 'result: ', result);

let sortKeys =_.map(result, item => item.key).sort(sortAlphaNum);
// console.log('sortKeys', sortKeys);


for (let i in sortKeys) {
     _.forEach(result, item => {
        if(sortKeys[i] === item.key ) {
            ouput.push(new Cell(sortKeys[i], item.value));
        }
    })
}

console.log('output', ouput);





