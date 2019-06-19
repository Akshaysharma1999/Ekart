
$(() => {



    console.log('ghedfra')
  
    let plus = $('#plus')
    let minus = $('#minus')
    let quantity = parseInt($('#quantity').val());
    let total = $('#total')
    let base_price = parseFloat($('#base_price').val())
    let price = $('#price')
  
    plus.click(() => {
      // console.log("clicked")
      quantity += 1
      $('#quantity').val(quantity)
      // console.log(quantity)
      total.text(quantity)
      price.val(base_price * quantity)
    })
  
    minus.click(() => {
      // console.log("clicked")
      quantity -= 1
      $('#quantity').val(quantity)
      // console.log(quantity)
      if (quantity < 1) {
        total.text(1)
        quantity = 1
        $('#quantity').val(1)
      }
      else {
        total.text(quantity)
      }
      price.val(base_price * quantity)
  
    })
  
  
  
  
  
  }) 