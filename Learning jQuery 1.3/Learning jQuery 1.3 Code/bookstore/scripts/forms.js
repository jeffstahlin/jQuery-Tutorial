/***************************************
   Contact form
-------------------------------------- */

$(document).ready(function() {

  // Enhance style of form elements.

  $('legend').each(function(index) {
    $(this).replaceWith('<h3>' + $(this).text() + '</h3>');
  });
  // $('legend').wrapInner('<span></span>');

  var requiredFlag = ' * ';
  var conditionalFlag = ' ** ';
  var requiredKey = $('input.required:first')
                               .next('span').text();
  var conditionalKey = $('input.conditional:first')
                               .next('span').text();
  
  requiredKey = requiredFlag + 
             requiredKey.replace(/^\((.+)\)$/,'$1');
  conditionalKey = conditionalFlag + 
            conditionalKey.replace(/\((.+)\)/,'$1');

  $('<p></p>')
    .addClass('field-keys')
    .append(requiredKey + '<br />')
    .append(conditionalKey)
    .insertBefore('#contact');

  $('form :input')
    .filter('.required')
      .next('span').text(requiredFlag).end()
      .prev('label').addClass('req-label').end()
    .end()
    .filter('.conditional')
      .next('span').text(conditionalFlag);

  // Checkbox toggle: conditional text inputs.
  
  $('input.conditional').next('span').andSelf().hide()
  .end().end()
  .each(function() {
    var $thisInput = $(this);
    var $thisFlag = $thisInput.next('span');
    $thisInput.prev('label').find(':checkbox')
    .attr('checked', false)
    .click(function() {
      if (this.checked) {
        $thisInput.show().addClass('required');
        $thisFlag.show();
        $(this).parent('label').addClass('req-label');
      } else {
        $thisInput.hide().removeClass('required').blur();
        $thisFlag.hide();
        $(this).parent('label').removeClass('req-label');
      }
    });
  });

  // Validate fields on blur.
  
  $('form :input').blur(function() {
    $(this).parents('li:first').removeClass('warning')
    .find('span.error-message').remove();
    
    if ($(this).hasClass('required')) {
      var $listItem = $(this).parents('li:first');
      if (this.value == '') {
        var errorMessage = 'This is a required field';
        if ($(this).is('.conditional')) {
          errorMessage += ', when its related ' + 
                                  'checkbox is checked';
        }
        $('<span></span>')
          .addClass('error-message')
          .text(errorMessage)
          .appendTo($listItem);
        $listItem.addClass('warning');
      }
    }

    if (this.id == 'email') {
      var $listItem = $(this).parents('li:first');
      if ($(this).is(':hidden')) {
        this.value = '';
      }
      if (this.value != '' && 
      !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value)) {
        var errorMessage = 'Please use proper e-mail format'
                                  + ' (e.g. joe@example.com)';
        $('<span></span>')
          .addClass('error-message')
          .text(errorMessage)
          .appendTo($listItem);
        $listItem.addClass('warning');
      }
    }
  });

  // Validate form on submit.
  
  $('form').submit(function() {
    $('#submit-message').remove();
    $(':input.required').trigger('blur');
    var numWarnings = $('.warning', this).length;
      if (numWarnings) {
        var fieldList = [];
        $('.warning label').each(function() {
          fieldList.push($(this).text());
        });
        $('<div></div>')
        .attr({
          'id': 'submit-message', 
          'class': 'warning'
        })
        .append('Please correct errors with the following ' + 
                                      numWarnings + ' fields:<br />')
        .append('&bull; ' + fieldList.join('<br />&bull; '))
        .insertBefore('#send');
      return false;
    };
  });

  // Checkboxes
  $('form :checkbox').removeAttr('checked');

  // Checkboxes with (un)check all.
  $('<li></li>')
  .html('<label><input type="checkbox" id="discover-all" />' + 
                                ' <em>check all</em></label>')
  .prependTo('li.discover > ul');
  $('#discover-all').click(function() {
    var $checkboxes = $(this) .parents('ul:first')
                                    .find(':checkbox');
    if (this.checked) {
      $(this).next().text(' un-check all');
      $checkboxes.attr('checked', true);
    } else {
      $(this).next().text(' check all');
      $checkboxes.attr('checked', '');
    };
  })
  .parent('label').addClass('checkall');
});



/***************************************
   Insert placeholder text
-------------------------------------- */

$(document).ready(function() {
  var $search = $('#search').addClass('overlabel');
  var $searchInput = $search.find('input');
  var $searchLabel = $search.find('label');
  
  if ($searchInput.val()) {
    $searchLabel.hide();
  }

  $searchInput
  .focus(function() {
    $searchLabel.hide();
  })
  .blur(function() {
    if (this.value == '') {
      $searchLabel.show();
    }
  });
  
  $searchLabel.click(function() {
    $searchInput.trigger('focus');
  });
});


/***************************************
   Autocomplete search field
-------------------------------------- */

$(document).ready(function() {
  var $autocomplete = $('<ul class="autocomplete"></ul>')
  .hide()
  .insertAfter('#search-text');
  var selectedItem = null;

  var setSelectedItem = function(item) {
    selectedItem = item;

    if (selectedItem === null) {
      $autocomplete.hide();
      return;
    }

    if (selectedItem < 0) {
      selectedItem = 0;
    }
    if (selectedItem >= $autocomplete.find('li').length) {
      selectedItem = $autocomplete.find('li').length - 1;
    }
    $autocomplete.find('li').removeClass('selected')
      .eq(selectedItem).addClass('selected');
    $autocomplete.show();
  };

  var populateSearchField = function() {
    $('#search-text').val($autocomplete
    .find('li').eq(selectedItem).text());
    setSelectedItem(null);
  };

  $('#search-text')
  .attr('autocomplete', 'off')
  .keyup(function(event) {
    if (event.keyCode > 40 || event.keyCode == 8) {
      // Keys with codes 40 and below are special (enter, arrow keys, escape, etc.).
      // Key code 8 is backspace.
      $.ajax({
        'url': '../search/autocomplete.php',
        'data': {'search-text': $('#search-text').val()},
        'dataType': 'json',
        'type': 'GET',
        'success': function(data) {
          if (data.length) {
            $autocomplete.empty();
            $.each(data, function(index, term) {
              $('<li></li>').text(term).appendTo($autocomplete).mouseover(function() {
                setSelectedItem(index);
              }).click(populateSearchField);
            });

            setSelectedItem(0);
          }
          else {
            setSelectedItem(null);
          }
        }
      });
    }
    else if (event.keyCode == 38 && 
                                 selectedItem !== null) {
      // User pressed up arrow.
      setSelectedItem(selectedItem - 1);
      event.preventDefault();
    }
    else if (event.keyCode == 40 && 
                                 selectedItem !== null) {
      // User pressed down arrow.
      setSelectedItem(selectedItem + 1);
      event.preventDefault();
    }
    
    else if (event.keyCode == 27 && selectedItem !== null) {
      // User pressed escape key.
      setSelectedItem(null);
    }
  }).keypress(function(event) {
    if (event.keyCode == 13 && selectedItem !== null) {
      // User pressed enter key.
      populateSearchField();
      event.preventDefault();
    }
  }).blur(function(event) {
    setTimeout(function() {
      setSelectedItem(null);
    }, 250);
  });
});


/***************************************
   Shopping cart
-------------------------------------- */

$(document).ready(function() {
  var stripe = function() {
    $('#cart tbody tr').removeClass('alt')
    .filter(':visible:odd').addClass('alt');
  };
  stripe();

  $('#recalculate').hide();

  $('.quantity input').keypress(function(event) {
    if (event.which && (event.which < 48 || 
                                       event.which > 57)) {
      event.preventDefault();
    }
  }).change(function() {
    var totalQuantity = 0;
    var totalCost = 0;
    $('#cart tbody tr').each(function() {
      var price = parseFloat($('.price', this)
                             .text().replace(/^[^\d.]*/, ''));
      price = isNaN(price) ? 0 : price;
      var quantity = 
               parseInt($('.quantity input', this).val(), 10);
      quantity = isNaN(quantity) ? 0 : quantity;         
      var cost = quantity * price;
      $('.cost', this).text('$' + cost.toFixed(2));
      totalQuantity += quantity;
      totalCost += cost;
    });
    $('.subtotal .cost').text('$' + totalCost.toFixed(2));
    var taxRate = parseFloat($('.tax .price').text()) / 100;
    var tax = Math.ceil(totalCost * taxRate * 100) / 100;
    $('.tax .cost').text('$' + tax.toFixed(2));
    totalCost += tax;
    $('.shipping .quantity').text(String(totalQuantity));
    var shippingRate = parseFloat($('.shipping .price')
                             .text().replace(/^[^\d.]*/, ''));
     var shipping = totalQuantity * shippingRate;
     $('.shipping .cost').text('$' + shipping.toFixed(2));
     totalCost += shipping;
     $('.total .cost').text('$' + totalCost.toFixed(2));
   });

  $('<th>&nbsp;</th>')
  .insertAfter('#cart thead th:nth-child(2)');
  $('#cart tbody tr').each(function() {
     $deleteButton = $('<img />').attr({
       'width': '16',
       'height': '16',
       'src': '../images/cross.png',
       'alt': 'remove from cart',
       'title': 'remove from cart',
       'class': 'clickable'
     }).click(function() {
       $(this).parents('tr').find('td.quantity input')
         .val(0).trigger('change')
       .end().hide();
       stripe();
     });
     $('<td></td>')
    .insertAfter($('td:nth-child(2)', this))
    .append($deleteButton);
   });
  $('<td>&nbsp;</td>')
  .insertAfter('#cart tfoot td:nth-child(2)');
});

/***************************************
   Edit Shipping Information
-------------------------------------- */

$(document).ready(function() {
  var editShipping = function() {
    $.get('shipping.php', function(data) {
      $('#shipping-name').remove();
      $(data).hide().appendTo('#shipping').slideDown();
      $('#shipping form').submit(saveShipping);
    });
    return false;
  };
  var saveShipping = function() {
    var postData = $(this).serialize() + '&op=Save';
    
    $.post('shipping.php', postData, function(data) {
      $('#shipping form').remove();
      $(data).appendTo('#shipping');
      $('#shipping-name').click(editShipping);
    });
    return false;
  };
  $('#shipping-name').click(editShipping);
});


