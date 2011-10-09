jQuery.fn.print = function(message) {
  return this.each(function() {
    $('<div class="result" />')
      .text(String(message))
      .appendTo($(this).find('.results'));
  });
};

// Example 1
// This causes a JavaScript error, so it is commented out.
// $(document).ready(function() {
//   function outerFn() {
//     $('#example-2').print('Outer function');
//     function innerFn() {
//       $('#example-1').print('Inner Function');
//     }
//   }
//   $('#example-1').print('innerFn():');
//   innerFn();
// });

// Example 2
$(document).ready(function() {
  function outerFn() {
    $('#example-2').print('Outer function');
    function innerFn() {
      $('#example-2').print('Inner function');
    }
    innerFn();
  }
  $('#example-2').print('outerFn():');
  outerFn();
});

// Example 3
$(document).ready(function() {
  var globalVar;

  function outerFn() {
    $('#example-3').print('Outer function');
    function innerFn() {
      $('#example-3').print('Inner function');
    }
    globalVar = innerFn;
  }
  $('#example-3').print('outerFn():');
  outerFn();
  $('#example-3').print('globalVar():');
  globalVar();
});

// Example 4
$(document).ready(function() {
  function outerFn() {
    $('#example-4').print('Outer function');
    function innerFn() {
      $('#example-4').print('Inner function');
    }
    return innerFn;
  }
  $('#example-4').print('var fnRef = outerFn():');
  var fnRef = outerFn();
  $('#example-4').print('fnRef():');
  fnRef();
});

// Example 5
$(document).ready(function() {
  function outerFn() {
    function innerFn() {
      var innerVar = 0;
      innerVar++;
      $('#example-5').print('innerVar = ' + innerVar);
    }
    return innerFn;
  }
  var fnRef = outerFn();
  fnRef();
  fnRef();
  var fnRef2 = outerFn();
  fnRef2();
  fnRef2();
});

// Example 6
$(document).ready(function() {
  var globalVar = 0;
  function outerFn() {
    function innerFn() {
      globalVar++;
      $('#example-6').print('globalVar = ' + globalVar);
    }
    return innerFn;
  }
  var fnRef = outerFn();
  fnRef();
  fnRef();
  var fnRef2 = outerFn();
  fnRef2();
  fnRef2();
});

// Example 7
$(document).ready(function() {
  function outerFn() {
    var outerVar = 0;
    function innerFn() {
      outerVar++;
      $('#example-7').print('outerVar = ' + outerVar);
    }
    return innerFn;
  }
  var fnRef = outerFn();
  fnRef();
  fnRef();
  var fnRef2 = outerFn();
  fnRef2();
  fnRef2();
});

// Example 8
$(document).ready(function() {
  function outerFn() {
    var outerVar = 0;
    function innerFn1() {
      outerVar++;
      $('#example-8').print('(1) outerVar = ' + outerVar);
    }
    function innerFn2() {
      outerVar += 2;
      $('#example-8').print('(2) outerVar = ' + outerVar);
    }
    return {'fn1': innerFn1, 'fn2': innerFn2};
  }
  var fnRef = outerFn();
  fnRef.fn1();
  fnRef.fn2();
  fnRef.fn1();
  var fnRef2 = outerFn();
  fnRef2.fn1();
  fnRef2.fn2();
  fnRef2.fn1();
});

// Example 9
$(document).ready(function() {
  var readyVar = 0;
  function innerFn() {
    readyVar++;
    $('#example-9').print('readyVar = ' + readyVar);
  }
  innerFn();
  innerFn();
});

// Example 10
$(document).ready(function() {
  var counter = 0;
  $('#example-10 a.add').click(function() {
    counter++;
    $('#example-10').print('counter = ' + counter);
    return false;
  });
});

// Example 11
$(document).ready(function() {
  var counter = 0;
  $('#example-11 a.add').click(function() {
    counter++;
    $('#example-11').print('counter = ' + counter);
    return false;
  });
  $('#example-11 a.subtract').click(function() {
    counter--;
    $('#example-11').print('counter = ' + counter);
    return false;
  });
});

// Example 12
$(document).ready(function() {
  $('#example-12 a').each(function(index) {
    $(this).click(function() {
      $('#example-12').print('index = ' + index);
      return false;
    });
  });
});

// Example 13
$(document).ready(function() {
  $('#example-13 a').each(function(index) {
    function clickHandler() {
      $('#example-13').print('index = ' + index);
      return false;
    }

    $(this).click(clickHandler);
  });
});

// Example 14
// This causes a JavaScript error when the links are clicked!
$(document).ready(function() {
  function clickHandler() {
    $('#example-14').print('index = ' + index);
    return false;
  }

  $('#example-14 a').each(function(index) {
    $(this).click(clickHandler);
  });
});
