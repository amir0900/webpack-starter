
// language helper - coming from the json server
// var language = {
//   heb: {
//     title: 'דף תשלום מאובטח',
//     welcomeMsg: `עמוד זה הינו עמוד התשלום עבור העסקה שביצעת באתר.`,
//     fillPrivateData: 'הזנת פרטי כרטיס אשראי',
//     personalDataPlaceHolder: 'עמוד זה הינו עמוד התשלום עבור העסקה שבצעת באתר',
//     personalId: 'ת.ז בעל כרטיס',
//     personalIdAreaInput: 'תעודת זהות של בעל הכרטיס',
//     personalIdErr: 'תעודת זהות אינה תקינה',
//     creditNum: 'מספר כרטיס',
//     creditAreaInput: 'מספר כרטיס',
//     creditErr: 'מספר כרטיס או פס מגנטי לא תקין',
//     cardExp: 'תוקף',
//     yearAreaInput: 'שנה של תוקף הכרטיס',
//     monthAreaInput: 'החודש של תוקף הכרטיס',
//     cardExpErr: 'תוקף לא תקין',
//     cvv: 'CVV',
//     cvvAreaInput: 'שלושת הספרות בגב בכרטיס',
//     cvvErr: 'יש לספק 3 או 4 ספרות בשדה ספרות ביקורת שבגב הכרטיס',
//     charge: 'סכום לחיוב',
//     symbol:'&#8362;',
//     numOfPayments: 'מספר תשלומים',
//     firstPayment:'תשלום ראשון:',
//     restOfPayments:'שאר תשלומים:',
//     paymentCommission: 'עמלת תשלומים',
//     currency: 'מטבע חיוב',
//     email: 'דוא"ל הרוכש',
//     orderId: 'מספר הזמנה: ',
//     paypalBtn: 'שלם באמצעות',
//     payBtn: 'תשלום',
//     cleanBtn: 'נקה שדות',
//     cancelBtn: 'ביטול עסקה',
//     supportPayments: 'אנו מכבדים את המותגים הבאים',
//     footerText:`
//     תשלום בעבור ההזמנה יבוצע רק לאחר בחירה בכפתור "שליחה" שבתחתית המסך.<br><span style="color:red";>*</span>
//     אנא וודא תחילה כי כל הפרטים בדף זה נכונים והזן את פרטי כרטיס האשראי כנדרש.`
//   },
//   eng: {
//     title: 'Secured Payment',
//     welcomeMsg: `In this page you can pay for the order you placed on the site.`,
//     personalDataPlaceHolder: 'this is the payment page followed by the transaction you made on the website',
//     fillPrivateData: 'fill credit card information',
//     personalId: 'Card Owner Identity Number',
//     personalIdAreaInput: 'security number of the card owner',
//     personalIdErr: 'Invalid Identity Number',
//     creditNum: 'Card Number',
//     creditAreaInput: 'Card Number',
//     creditErr: 'Invalid Credit Card Number or Track2',
//     cardExp: 'Card Expiration',
//     yearAreaInput: 'Card expiration year',
//     monthAreaInput: 'Card expiration month',
//     cardExpErr: 'Invalid Card Expiration',
//     cvv: 'CVV',
//     cvvAreaInput: '3 numbers in the back of the card',
//     cvvErr: 'Invalid CVV',
//     charge: 'Total Charge',
//     symbol:'$',
//     numOfPayments: 'Number of Payments',
//     firstPayment:'first payment:',
//     restOfPayments:'rest of payments:',
//     paymentCommission: 'payment commission',
//     currency: 'Currency',
//     email: 'Payer Email',
//     orderId: 'Order ID: ',
//     payBtn: 'Pay Now',
//     paypalBtn: 'Pay with ',
//     cleanBtn: 'Clean',
//     cancelBtn: 'Cacnel',
//     supportPayments: 'We accept the following cards',
//     footerText:` The payment process is fully secure and complies with the highest standards of data protection.
//     Please first confirm the details of the payment amount and the installment details.<br><span style="color:red";>*</span>
//     Then, please insert your credit card details as required below.
//     Payment for the order will only be auctioned after you click on the 'Pay' button at the bottom on the screen.`
//   }
// }

// return the correct lang path following the user config data
// function langExport (langConfig) {
//   return language[langConfig.lang]
// }

// push text to the DOM following the user config 
function userLang (config) {
  var selectedLang = config

  // header inputs
  document.getElementById('cg-icon-span').innerHTML = selectedLang.title
  document.getElementById('cg-instruction-text').innerHTML = selectedLang.personalDataPlaceHolder
  document.getElementById('cg-h3').innerHTML = selectedLang.fillPrivateData
  document.getElementById('cg-text-order-number').innerHTML = selectedLang.orderId

  // form inputs
  document.getElementById('credit-card-label').innerHTML = selectedLang.creditNum
  document.getElementById('expYear-label').innerHTML = selectedLang.cardExp
  document.getElementById('cvv-label').innerHTML = selectedLang.cvv
  document.getElementById('personal-label').innerHTML = selectedLang.personalId
  document.getElementById('paymentsNumber-label').innerHTML = selectedLang.numOfPayments
  document.getElementById('firstPayment-label').innerHTML = selectedLang.firstPayment
  document.getElementById('restOfPayment-label').innerHTML = selectedLang.restOfPayments
  // document.getElementById('symbol').innerHTML = selectedLang.symbol
  document.getElementById('footer-text').innerHTML = selectedLang.footerText

  //error msg
  document.getElementById('creditErr').innerHTML = selectedLang.creditErr
  document.getElementById('cvvErr').innerHTML = selectedLang.cvvErr
  document.getElementById('cardExpErr').innerHTML = selectedLang.cardExpErr
  document.getElementById('personalIdErr').innerHTML = selectedLang.personalIdErr


  // form area attribute
  document.getElementById('credit-card-input').setAttribute('aria-label', selectedLang.creditAreaInput)
  document.getElementById('expire-year-input').setAttribute('aria-label',  selectedLang.yearAreaInput)
  document.getElementById('expire-month-input').setAttribute('aria-label', selectedLang.monthAreaInput)
  document.getElementById('cvv-input').setAttribute('aria-label', selectedLang.cvvAreaInput)
  document.getElementById('personal-id-input').setAttribute('aria-label', selectedLang.personalIdAreaInput)


  // form btn
  document.getElementById('submit').innerHTML = selectedLang.payBtn
  document.getElementById('paypal-text').innerHTML = selectedLang.paypalBtn
  document.getElementById('cancel').innerHTML = selectedLang.cancelBtn
  document.getElementById('clean').innerHTML = selectedLang.cleanBtn

  document.getElementById('charge-text').innerHTML = selectedLang.charge
}

export let setUserLang = userLang

