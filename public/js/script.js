
// console.log('/js/style.js')

var stripe = Stripe('pk_test_IDOr694fRC0fHyd9dDs1Hpl400bNOkWuZA');

var opts = {
  lines: 13, // The number of lines to draw
  length: 38, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: '#000000', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  position: 'absolute' // Element positioning
};

var target = document.getElementById('spinner')
var spinner = new Spinner(opts)


var elements = stripe.elements();

var style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

var card = elements.create('card', { style: style });

card.mount('#card-element');

card.addEventListener('change', function (event) {

  document.getElementById("stripeBtn").disabled = false 
  spinner.stop()
  
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

var form = document.getElementById('payment-form');
form.addEventListener('submit', function (event) {
   event.preventDefault();

  document.getElementById("stripeBtn").disabled = true
  spinner.spin(target);

  stripe.createToken(card).then(function (result) {
    
    if (result.error) {
     
      document.getElementById("stripeBtn").disabled = false   
      spinner.stop()   

      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {       

      stripeTokenHandler(result.token);
    }
  });
});

function stripeTokenHandler(token) {
 
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  form.submit();
}

