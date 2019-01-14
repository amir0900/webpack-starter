console.log('start date 11.11.18')

// main js controler 
import '../assets/fontawesome-free-5.5.0-web/css/all.min.css'
import '../styles/main.scss'
import '../styles/animted.scss'
import '../styles/flexer.scss'

import $ from 'jquery'
import { restApi } from './service.js'
import { setUserLang } from './lang.js'
import { paypal, generateCharge, generatePayment, costumeSel } from './costumeEl.js'
import * as validate from './validate.js'

function setUserStyle (style) {
  //append style based on screen width
  let userWindow = $(window).width()
  if(userWindow > 1200){
    style = style.pc
  }else if(userWindow > 700){
    style = style["mob-landscape"]
  }else if(userWindow > 320){
    style = style.mob
  }

  for (let index = 0; index < Object.keys(style).length; index++) {
    const element = Object.keys(style)[index]
    const elStyle = style[element]
    if (element != 'body') {
      $('#' + element).css(elStyle)
    }else {
      $(element).css(elStyle)
    }
  }
}


function hideEl(elements){
  for (let i = 0;i < elements.length;i++) {
    $("#"+elements[i]).css("display","none");
  }
}

export let requiredEl;
function setUserJS (json) {
  $('#cg-order-number').text(json.extraData.transactionId)
  generateCharge(json.extraData)
  generatePayment(json.extraData)

  // hide unrequired elements
  hideEl(json['hidden-elements'])
  //push paypal link incase of required
  paypal(json.extraData.payPalLink,json.extraData.payPalVisibile)
  costumeSel()
  validate.pageReload(json.extraData.reloadTime)
  requiredEl = json['required-inputs']
}


$(document).ready(function () {
    
  // load configuration following api request 
  restApi.get('https://28b2fbf6-5f0e-4a3b-b572-d3e57dd4e706.mock.pstmn.io/user').then(r => {
    setUserLang(r.builder.language)
    setUserJS(r)
    setUserStyle(r.builder.styling)
  }).then(r => {
    $('#loader').css('display', 'none')
  })
})


