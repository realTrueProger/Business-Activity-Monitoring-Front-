const moment = require('moment');

const thirtyDaysAgo = moment().subtract(30, 'days');
const now = moment();
const resultDatesArr = [];

while(thirtyDaysAgo.format() !== now.format()) {
    thirtyDaysAgo.add(1, 'days');
    resultDatesArr.push(thirtyDaysAgo.date());
}

console.log(resultDatesArr);
console.log(resultDatesArr.length);

