const functions = require('./index');
const validateUnit = require('../scripts/validate');
let test=1
console.log(te)
/* helper
test('name', () => {
    // array
    expect(Array.isArray(['value'])).toBe(true);
    // string
    expect(typeof 'value').toBe('string');
    // object
    expect({value: 'value'}).toBeTruthy();
    expect(typeof {value: 'value'}).toBe('object');
  })
   */

   test('check sum',() =>{
       expect(functions.add(2,2)).toBe(4)
   })
   test('toBeFalsy',() =>{
    expect(validateUnit.regexTest(2)).toBeFalsy()
})