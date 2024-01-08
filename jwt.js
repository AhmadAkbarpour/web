var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
console.log(token)
var decoded = jwt.verify(token, 'shhhhh');
console.log(decoded);


console.log(Date.now())