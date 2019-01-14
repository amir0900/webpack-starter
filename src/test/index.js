 function regexTest (type) {
  let creditCardReg = new RegExp('^[0-9]')
  let cvvReg = new RegExp('^[0-9]{2,4}$')
  let personalIdReg = new RegExp('^[0-9]{5,9}$')
  let result
  switch (type) {
    case 'creditCard':
      return result = creditCardReg.test(document.getElementById('credit-id-input').value)
    case 'cvv':
      return result = cvvReg.test(document.getElementById('cvv-input').value)
    case 'personalId':
      return result = personalIdReg.test(document.getElementById('personal-id-input').value)
  }
  return result
}

function add(num,numb){
 return num + numb
}
let functions ={
  add:add,
  regexTest:regexTest
}
  module.exports = functions