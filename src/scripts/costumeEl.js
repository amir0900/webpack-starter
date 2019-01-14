import $ from 'jquery'

// append option dates - self invoked 
;(function generateDate () {
  // get current year
  let Expired = new Date()
  let years = $('#expire-year-input')

  // add 10 next years option
  for (let i = 0;i < 16; i++) {
    let option = document.createElement('option')
    option.text = Expired.getFullYear() + i
    option.value = Expired.getFullYear() + i
    years.append(option)
  }
})()

export function costumeSel () {
  // custume select element
  var x, i, j, selElmnt, a, b, c
  /*look for any elements with the class "custom-select":*/
  x = document.getElementsByClassName('custom-select')
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName('select')[0]
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement('DIV')
    a.setAttribute('class', 'select-selected')
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML
    x[i].appendChild(a)
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement('DIV')
    b.setAttribute('class', 'select-items select-hide')
    for (j = 0; j < selElmnt.length; j++) {
      /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
      c = document.createElement('DIV')
      c.innerHTML = selElmnt.options[j].innerHTML
      c.addEventListener('click', function (e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h
        s = this.parentNode.parentNode.getElementsByTagName('select')[0]
        h = this.parentNode.previousSibling
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i
            h.innerHTML = this.innerHTML
            y = this.parentNode.getElementsByClassName('same-as-selected')
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute('class')
            }
            this.setAttribute('class', 'same-as-selected')
            break
          }
        }
        h.click()
      })
      b.appendChild(c)
    }
    x[i].appendChild(b)
    a.addEventListener('click', function (e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation()
      closeAllSelect(this)
      this.nextSibling.classList.toggle('select-hide')
      this.classList.toggle('select-arrow-active')
    })
  }
  function closeAllSelect (elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, arrNo = []
    x = document.getElementsByClassName('select-items')
    y = document.getElementsByClassName('select-selected')
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove('select-arrow-active')
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add('select-hide')
      }
    }
  }
  /*if the user clicks anywhere outside the select box,
  then close all select boxes:*/
  document.addEventListener('click', closeAllSelect)
}

export function colorInput (el, condintion) {
  if (condintion) {
    el.removeClass('invalid-input')
    $(el).parent().removeClass('show-invalid-msg')
    el.addClass('valid-input')
    $(el).parent().addClass('show-valid-msg')
  }else {
    $(el).parent().removeClass('show-valid-msg')
    el.removeClass('valid-input')

    $(el).parent().addClass('show-invalid-msg')
    el.addClass('invalid-input')
  }
}

export function toggleAnimation (el) {
  $('.input-control').removeClass('active-input')
  $(el.target.parentElement.parentElement).addClass('active-input')
}

export function generatePayment (extraData) {
  // get max paymentes allowd 
  let maxPayments = extraData.payments
  let select = $('#paymentsNumber-input')

  // add options based on json config from the api- split payment
  for (let i = 1;i <= maxPayments; i++) {
    let option = document.createElement('option')
    option.text = i
    option.value = i
    select.append(option)
  }
  // append first initial
  $('#firstPayment-input').text(extraData.charge)
}
export function generateCharge(extraData){
    // IF THE BROWSER IS INTERNET EXPLORER 10
    if (navigator.appVersion.indexOf('MSIE 10') !== -1) {
      let currency = extraData.currency
      let symbol
      if (currency === 'usd') {
        symbol = '$'
      }else if (currency === 'eur') {
        symbol = '€'
      }else if (currency === 'gbp') {
        symbol = '£'
      }
      $('#amount').text(symbol + extraData.charge)
    }else {
      const formatter = new Intl.NumberFormat(extraData.countryFormat, {
        style: 'currency',
        currency: extraData.currency,
        minimumFractionDigits: 2
      })
  
      let amount = formatter.format(extraData.charge)
      $('#amount').text(amount)
    }
}
$('#number-of-payments').on('click', function (e) {
  restOfPayment()
})
export function paypal(paypalLink,paypalShow){
  $("#paypal-submit").attr("href",paypalLink)
  if(!paypalShow){
    $("#paypal-submit").hide(paypalShow);
  }
 
}

function restOfPayment () {
  // not working becuase it have uniq char as $/€
  let amount = $('#amount').text()
  let payments = $('#paymentsNumber-input').val()
  let firstPayment = $('#firstPayment-input')
  let restOfPayment = $('#restOfPayment-input')

  let Payment = amount / payments

  if (Payment % 1 == 0) {
    firstPayment.text(Payment)
    if (payments != 1) {
      restOfPayment.text(Payment)
    }else {
      restOfPayment.text('0.00')
    }
  }else {
    let int = Math.floor(Payment)
    let decimal = Payment - int
    let Reminder = decimal * payments

    let firstPay = int + Reminder
    firstPayment.text(firstPay.toFixed(2))
    restOfPayment.text(int)
  }
}

$('#cvv-guide').on('mouseover', function (e) {
  $('#image-guide-wrap').css({
    display: 'block',
    zIndex: '1'
  })
})
$('#cvv-guide').on('mouseleave', function (e) {
  $('#image-guide-wrap').css({
    display: 'none',
    zIndex: '-1'
  })
})

// add animated classes *side note . catch the divs this way its only for future use of console project
