/************* SEARCH ONLINE FOR ENCODE INPUT POST VALUE IN TREDITION WAY ****************/

import $ from 'jquery'
import * as costumeEl from './costumeEl.js'
import { requiredEl } from './index.js'
import { restApi } from './service.js'

// regex test
function regexTest (type) {
  let creditCardReg = new RegExp('^[0-9]')
  let cvvReg = new RegExp('^[0-9]{3,4}$')
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

// check track2
let track2Input = false
function checkTrack2 (num) {
  var patt1 = /[0-9]*=[0-9]*(\*[0-9A-Z]{36,38}\*)?/
  if (num.match(patt1)) {
    return patt1.exec(num)[0]
  }else {
    return false
  }
}

// credit card validation
function creditCardType (el) {
  if (el.target.value.length >= 32) {
    let track2test = el.target.value.replace(/[-|*]|\s/g, '')
    let trackResult = checkTrack2(track2test)
    console.log(trackResult)
    setTimeout(() => {

      $('#' + el.target.id).attr('value', trackResult)
      $('#' + el.target.id).val(el.target.value.replace(/[0-9A-Za-z-|=|\s]/g, '*').substring(0, 18))
      if (trackResult) {
        costumeEl.colorInput($('#' + el.target.id), true)
        track2Input = true
        $('#expire-date,#cvv').css('display', 'none')
      }else {
        costumeEl.colorInput($('#' + el.target.id), false)
      }
    }, 500)
  }else {
    let visaPattern = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$')
    let mastPattern = new RegExp('^(?:5[1-5][0-9]{14})$')
    let amexPattern = new RegExp('^(?:3[47][0-9]{13})$')
    let discPattern = new RegExp('^(?:6(?:011|5[0-9][0-9])[0-9]{12})$')
    let dinersPattern = new RegExp('^3(?:0[0-5]|[68][0-9])[0-9]{11}$')
    let jcbPattern = new RegExp('^(?:2131|1800|35[0-9]{3})[0-9]{11}')

    let isVisa = visaPattern.test(el.target.value.replace(/-|\s/g, '')) === true
    let isMast = mastPattern.test(el.target.value.replace(/-|\s/g, '')) === true
    let isAmex = amexPattern.test(el.target.value.replace(/-|\s/g, '')) === true
    let isDisc = discPattern.test(el.target.value.replace(/-|\s/g, '')) === true
    let isDiners = dinersPattern.test(el.target.value.replace(/-|\s/g, '')) === true
    let isJcb = jcbPattern.test(el.target.value.replace(/-|\s/g, '')) === true

    if (el.keyCode !== 8 && el.target.value.replace(/-|\s/g, '').toString().length != 16) {
      el.target.value = el.target.value.replace(/(\d{4}(?!\s))/g, '$1 - ')
    }

    let iconEl = $('#input-icon')

    if (isVisa || isMast || isAmex || isDisc || isDiners || isJcb) {
      // at least one regex matches, so the card number is valid.
      iconEl.removeClass('far fa-credit-card fa-cc-visa fa-cc-mastercard fa-cc-amex fa-cc-discover fa-cc-diners-club fa-cc-jcb')
      iconEl.addClass('fab')
      if (isVisa) {
        // Visa-specific logic goes here
        console.log('isVisa')
        iconEl.addClass('fa-cc-visa')
      }
      else if (isMast) {
        // Mastercard-specific logic goes here
        console.log('isMast')
        iconEl.addClass('fa-cc-mastercard')
      }
      else if (isAmex) {
        // AMEX-specific logic goes here
        console.log('isAmex')
        iconEl.addClass('fa-cc-amex')
      }
      else if (isDisc) {
        // Discover-specific logic goes here
        console.log('isDisc')
        iconEl.addClass('fa-cc-discover')
      }
      else if (isDiners) {
        // AMEX-specific logic goes here
        console.log('isDiners')
        iconEl.addClass('fa-cc-diners-club')
      }
      else if (isJcb) {
        // AMEX-specific logic goes here
        console.log('isJcb')
        iconEl.addClass('fa-cc-jcb')
      }
    }else {
      iconEl.removeClass('')
      iconEl.addClass('far fa-credit-card')
    }
  }
}

// prevent user from keep typing incase of regex test
function preventTyping (e, num) {
  if (e.target.value.length >= num) {
    e.preventDefault()
  }
}

// Luhn algorithm identifier verification
function isValidCC (identifier) {
  function isracardCheck (identifier) {
    if (identifier.length != 8 && identifier.length != 9) {
      return false
    }else {
      if (identifier.length == 8) {
        identifier = '0' + identifier
      }
    }

    var sum = 0,
      alt = false,
      i = identifier.length - 1,
      mahpil = 1,
      num

    while (i >= 0){
      // get the next digit
      num = parseInt(identifier.charAt(i), 10)

      // if it's not a valid number, abort
      if (isNaN(num)) {
        return false
      }

      // add to the rest of the sum
      sum += num * mahpil

      // go to next digit
      mahpil++
      i--
    }

    // determine if it's valid
    return (sum % 11 == 0)
  }

  if (identifier.length == 8 || identifier.length == 9) {
    return isracardCheck(identifier)
  }

  if (identifier.charAt(0) == '1' && identifier.charAt(1) == '0' && (identifier.length == 16 || identifier.length == 32))
    return true

  let sum = 0,
    alt = false,
    i = identifier.length - 1,
    num

  if (identifier.length < 10 || identifier.length > 19) {
    return false
  }

  while (i >= 0){

    // get the next digit
    num = parseInt(identifier.charAt(i), 10)

    // if it's not a valid number, abort
    if (isNaN(num)) {
      return false
    }

    // if it's an alternate number...
    if (alt) {
      num *= 2
      if (num > 9) {
        num = (num % 10) + 1
      }
    }

    // flip the alternate bit
    alt = !alt

    // add to the rest of the sum
    sum += num

    // go to next digit
    i--
  }

  // determine if it's valid
  return (sum % 10 == 0)
}

function creditCardValidation (el) {

  // luhn aglorithem 
  let value = (el.target.value.replace(/-|\s/g, '')).toString()
  let result = isValidCC(value)
  let inputEl = $('#' + el.target.id)

  // add green color class -present valid cc
  costumeEl.colorInput(inputEl, result)

  // type of a card
  creditCardType(el)

  // prevent keep typing
  preventTyping(el, 25)
}

// run time test
function validInput () {
  $('#credit-card-input').keyup(function (el) {
    creditCardValidation(el)
  })

  $('#cvv-input').keyup(function (el) {
    let inputEl = $('#' + el.target.id)

    if (regexTest('cvv')) {
      costumeEl.colorInput(inputEl, true)
      preventTyping(el, 4)
    }else {
      costumeEl.colorInput(inputEl, false)
    }
  })

  $('#cvv-input').keypress(function (el) {
    let inputEl = $('#' + el.target.id)

    if (regexTest('cvv')) {
      costumeEl.colorInput(inputEl, true)
      preventTyping(el, 4)
    }else {
      costumeEl.colorInput(inputEl, false)
    }
  })

  $('#personal-id-input').keyup(function (el) {
    let inputEl = $('#' + el.target.id)
    if (regexTest('personalId')) {
      costumeEl.colorInput(inputEl, true)
      preventTyping(el, 9)
    }else {
      costumeEl.colorInput(inputEl, false)
    }
  })
  $('#personal-id-input').keypress(function (el) {
    let inputEl = $('#' + el.target.id)
    if (regexTest('personalId')) {
      costumeEl.colorInput(inputEl, true)
      preventTyping(el, 9)
    }else {
      costumeEl.colorInput(inputEl, false)
    }
  })
}

$('#expire-date').click(function (e) {
  let inputEl = $('#expire-date .select-selected')
  let thisYear = new Date().getFullYear()
  let thisMonth = new Date().getMonth() + 1
  let userMonth = Number($('#expire-month-input').val())
  if (thisYear == Number($('#expire-year-input').val()) && thisMonth > userMonth) {
    costumeEl.colorInput(inputEl, false)
  }else {
    costumeEl.colorInput(inputEl, true)
  }
})

// ** event listeners ** //

$('#cg-form').focusin(function (e) {

  // check input is valid
  validInput()

  //  target and add active class
  costumeEl.toggleAnimation(e)

  // prevent page from reload ONCE click on btn
  if (e.target.id != 'paypal-submit') {
    $(e.target).click(function () {
      event.preventDefault()
    })
  }
})

$('#clean').click(function () {
	console.log('clear clicked')
  $('.input-type').val('')
  $('.input-control input').removeClass('valid-input invalid-input')
})

// submit form
$('#submit').click(function () {
  validForm()
})

function validForm () {
  let validCounter = 0
  // requiredEl coming from the config 
  let newRequiredEl = requiredEl
  for (let i = 0;i < newRequiredEl.length;i++) {
    let el = $('#' + newRequiredEl[i])

    // in case of track 2 typed
    if (track2Input) {
      newRequiredEl = requiredEl.filter(item => {
        return item != 'cvv-input' && item != 'expire-date'})
    }
    if ($(el).hasClass('valid-input') || $('#' + $(el).attr('id') + ' .select-selected').hasClass('valid-input')) {
      validCounter++
      if (validCounter == newRequiredEl.length) {
        submitForm(event)
        break
      }
    }else {
      // incase case inputs are not valid
      if ($(el).attr('id') == 'expire-date') {
        $('#' + $(el).attr('id') + ' .select-selected').addClass('invalid-input')
      }
      $(el).focus()
      break
    }
  }

  function submitForm (event) {
    $(event.target).addClass('disableBtn')
    $(event.target).attr('disabled', 'disabled')
    // push the required elements follwing the config api
    let date = $('#expire-month-input').val() + '/' + $('#expire-year-input').val()
    let form = {}


    // build the object & track2 adjustment 
    for (let i = 0;i < requiredEl.length;i++) {
      let elVal
      if (track2Input) {
        if (requiredEl[i] != 'credit-card-input') {
          $('#' + requiredEl[i]).attr('value', $('#' + requiredEl[i]).val())
        }
        elVal = $('#' + requiredEl[i]).attr('value')
      }else {
        elVal = $('#' + requiredEl[i]).val().replace(/-|\s/g, '')
      }
      let elKey = $('#' + requiredEl[i])[0].name
      if (requiredEl[i] == 'expire-date') {
        form['expire-date'] = date
      }else {
        form[elKey] = elVal
      }
    }

    if (track2Input) {
      delete form.cvv
      delete form['expire-date']
    }
    restApi.post('https://28b2fbf6-5f0e-4a3b-b572-d3e57dd4e706.mock.pstmn.io/payment', form)
  }
}

// used in index.js following config
export function pageReload (timeout) {
  // page reload in milisecond
  setTimeout(() => {
    location.reload()
  }, timeout)
}

// prevent user from click enter on form
$(window).keydown(function (event) {
  if (event.keyCode == 13) {
    event.preventDefault()
    return false
  }
})
